import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {isAuthenticated } from '../auth';
import {createCategory} from './apiadmin'


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

const AddCategory = () => {
  const classes = useStyles();

  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  //destructure user and token from localstorage
  const {user, token} = isAuthenticated()

  const handleChange = (e) => {
    setError('')
    setName(e.target.value)
  }

  const clickSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    // make request to api to create category
    createCategory(user._id, token, {name})
     .then(data => {
       if(data.error) {
         setError(true)
       } else {
         setError("");
         setSuccess(true);
       }
     });
  };

  const newCategoryForm = () => (
    <form className={classes.form} noValidate onSubmit={clickSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="New Category"
            autoFocus
            onChange={handleChange}
            value={name}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Create New Category
      </Button>
    </form>
  )

  const showSuccess = () => {
    if(success) {
      return <Typography component="h1" variant="h5" color="primary">{name} is Created</Typography>
    }
  }

  const showError = () => {
    if(error) {
      return <Typography component="h1" variant="h5" color="secondary">Category Already Exist</Typography>
    }
  }

  const goBack = () => (
    <Grid container>
      <Grid item>
        <Link href="/admin/dashboard" variant="body2">
              {"Back to Dashboard"}
        </Link>
      </Grid>
    </Grid>
  )

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PlaylistAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add New Category
        </Typography>
         {showSuccess()}
         {showError()}
         {newCategoryForm()}
         {goBack()}
      </div>
    </Container>
  );
}

export default AddCategory;
