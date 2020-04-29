import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signup } from '../auth'


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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  })

  const {name, email, password, loading, error, success } = values

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true});
    signup({ name, email, password }).then(data => {
      if(data.error) {
        setValues({ ...values, error: data.error, success: false , loading: false })
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          success: true
        });
      }
    })
  };

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

  const signUpForm = () => (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>

        <Grid item xs={12} >
          <TextField
            autoComplete="fname"
            name="name"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Full Name"
            autoFocus
            value={name}
            onChange={handleChange("name")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email.toLowerCase()}
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
        color="secondary"
        className={classes.submit}
        onClick={clickSubmit}
      >
        Sign Up
      </Button>
    </form>
  );

  const showError = () => {
    if(error) {
      return <Typography fontWeight="fontWeightBold" m={1} style={{display: error ? "" : "none"}} color="secondary">
       {error}
      </Typography>
    }
  }

  const showLoading = () => (
    loading && (
        <CircularProgress variant="determinate" value={progress} />
    )
  );

  const showSuccess = () => (
    <Typography fontWeight="fontWeightBold" m={1} style={{display: success ? "" : "none"}} color="primary">
     New Account is Created. Please <Link href="/signin" className={classes.link} color="secondary">
        Sign In
      </Link>
    </Typography>
  )

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <br/>
        {showLoading()}
        {showSuccess()}
        {showError()}
        {signUpForm()}
      </div>
    </Container>
  );
}

export default SignUp;
