import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { signin, authenticate, isAuthenticated } from "../auth";


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  BottomBar: {
    top: 'auto',
    bottom: 0,
  },
  errorText: {
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

const SignIn = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
   email: "",
   password: "",
   error: "",
   loading: false,
   redirectToReferrer: false,
 });

const { email, password, loading, error, redirectToReferrer } = values;

const { user } = isAuthenticated()

const handleChange = name => event => {
     setValues({ ...values, error: false , [name]: event.target.value });
 };

 const clickSubmit = (event) => {
   event.preventDefault();
    setValues({ ...values, error: false, loading: true});
    signin({ email, password }).then(data => {
      if(data.error){
        setValues({ ...values, error: data.error, loading: false})
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer : true
          });
        });
      }
    });
 };



  const signInForm = () => (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            value={email}
            onChange={handleChange("email")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange("password")}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={clickSubmit}>
        Sign In
      </Button>

    </form>
  );

  const showError = () => (
    <Typography fontWeight="fontWeightBold" m={1} style={{display: error ? "" : "none"}} color="secondary" className={classes.errorText}>
     {error}
    </Typography>
  );

  const showLoading = () => (
    loading && (
        <CircularProgress />
    )
  );

  const redirectUser = () => {
    if(redirectToReferrer) {
      if(user && user.role === 1 ){
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
         <Typography component="h1" variant="h5">
           Sign In
         </Typography>
        <br/>
       {showLoading()}
       {showError()}
       {signInForm()}
       {redirectUser()}
      </div>
      <Grid container>
        <Grid item>
          <Link href="/signup" variant="body2" color="secondary">
              {"Belum Punya Account? Daftar Sekarang"}
          </Link>
        </Grid>
      </Grid>

      <AppBar
        position="fixed"
        color="inherit"
        className={classes.BottomBar}>
        <Grid container>

          <Grid item xs={3} sm={3}>
            <Link color="inherit" href="/shop">
              <ListItem>
                 <ListItemText align="center"> <StoreIcon/> Belanja </ListItemText>
              </ListItem>
            </Link>
          </Grid>

          <Grid item xs={3} sm={3}>
           <Link color="inherit" href="/cart">
              <ListItem>
                 <ListItemText align="center">
                    <ShoppingCartIcon/>
                    Keranjang
                 </ListItemText>
              </ListItem>
           </Link>
          </Grid>

          <Grid item xs={3} sm={3}>
            <Link color="inherit" href="/">
               <ListItem>
                 <ListItemText align="center"> <HomeIcon/> Home </ListItemText>
               </ListItem>
            </Link>
          </Grid>

          <Grid item xs={3} sm={3}>
            <Link color="inherit" href="/user/dashboard">
               <ListItem>
                  <ListItemText align="center"> <AccountCircle/> Account </ListItemText>
               </ListItem>
            </Link>
          </Grid>

        </Grid>
      </AppBar>
    </Container>
  );
}

export default SignIn;
