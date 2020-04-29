import React, {useState} from 'react';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
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
import { signin, authenticate, isAuthenticated } from "../auth"


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  errorText: {
    textAlign: "center",
  },
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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

const theme = createMuiTheme({
  palette: {
    primary: { main: blueGrey[500] }, // Purple and green play nicely together.
  },
  typography: { useNextVariants: true },
});

const SignIn = () => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  const [values, setValues] = useState({
   email: "",
   password: "",
   error: "",
   loading: false,
   redirectToReferrer: false,
 });

 const { email, password, loading, error, redirectToReferrer } = values;

 const { user } = isAuthenticated()

 React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

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
      <MuiThemeProvider theme={theme}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={clickSubmit}
      >
        Sign In
      </Button>
      </MuiThemeProvider>
    </form>
  );

  const showError = () => (
    <Typography fontWeight="fontWeightBold" m={1} style={{display: error ? "" : "none"}} color="secondary" className={classes.errorText}>
     {error}
    </Typography>
  );

  const showLoading = () => (
    loading && (
        <CircularProgress variant="determinate" value={progress} />
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

        <Avatar>
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
          <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignIn;
