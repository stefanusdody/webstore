import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signin, authenticate, isAuthenticated } from "../auth"


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
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
        onClick={clickSubmit}
      >
        Sign In
      </Button>
    </form>
  );

  const showError = () => (
    <Typography fontWeight="fontWeightBold" m={1} style={{display: error ? "" : "none"}} color="secondary">
     {error}
    </Typography>
  );

  const showLoading = () => (
    loading && (
      <Typography fontWeight="fontWeightBold" m={1} color="secondary">
        Loading..
      </Typography>)
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
          <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignIn;
