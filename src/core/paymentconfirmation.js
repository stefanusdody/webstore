import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import PaymentIcon from '@material-ui/icons/Payment';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {createPayment} from './apicore';
import {getCategories} from '../admin/apiadmin';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(10),
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
  button: {
    margin: theme.spacing(1),
  },
  text: {
    textAlign: "center"
  }

}));

const PaymentConfirmation = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    transaction_Id: "",
    amount: "",
    bank: "",
    date: "",
    photo: "",
    loading: false,
    error: "",
    createdPayment: "",
    redirectToProfile: false,
    formData: ""
  });


  const {
    name,
    transaction_Id,
    amount,
    bank,
    date,
    photo,
    loading,
    error,
    createdPayment,
    redirectToProfile,
    formData
      } = values;

      //Load categories and set form data
        const init = () => {
          getCategories().then(data => {
            if(data.error) {
              setValues({
                 ...values,
                 error: data.error})
            } else {
              setValues({
                 ...values,
                 categories: data,
                 formData: new FormData()})
            }
          })
        }


      useEffect(() => {
      init();
      }, [])

 const handleChange = name => event => {
   const value = name === "photo" ? event.target.files[0] : event.target.value
   formData.set(name, value)
   setValues({...values, [name]: value})
 };

 const clickSubmit = event => {
  event.preventDefault()
  setValues({...values, error: "", loading:true})
  createPayment(formData)
  .then(data => {
     if(data.error) {
       setValues({...values, error: data.error})
     } else {
          setValues({
            ...values,
            name: "",
            transaction_Id: "",
            amount: "",
            bank: "",
            date: "",
            photo: "",
            loading: false,
            createdPayment: data.name
          })
        }
      }
   );
 };


  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
     <Grid container spacing={2}>

       <Grid item xs={12} >
              <TextField
               autoComplete="photo"
               name="photo"
               variant="outlined"
               required
               fullWidth
               id="photo"
               label=""
               autoFocus
               onChange={handleChange("photo")}
               type="file"
               name="photo"
               accept="image/*" />
        </Grid>

        <Grid item xs={12} >
          <TextField
            autoComplete="fname"
            name="name"
            type="text"
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

        <Grid item xs={12} >
          <TextField
            autoComplete="transaction_Id"
            name="transaction_Id"
            type="text"
            variant="outlined"
            required
            fullWidth
            id="transaction_Id"
            label="Transaction Id"
            autoFocus
            value={transaction_Id}
            onChange={handleChange('transaction_Id')}
          />
        </Grid>

        <Grid item xs={12} >
          <TextField
            autoComplete="amount"
            name="amount"
            type="number"
            variant="outlined"
            required
            fullWidth
            id="amount"
            label="Amount"
            autoFocus
            value={amount}
            onChange={handleChange('amount')}
          />
        </Grid>

        <Grid item xs={12} >
          <TextField
            autoComplete="bank"
            name="bank"
            type="text"
            variant="outlined"
            required
            fullWidth
            id="bank"
            label="Bank"
            autoFocus
            value={bank}
            onChange={handleChange('bank')}
          />
        </Grid>

        <Grid item xs={12} >
          <TextField
            autoComplete="fname"
            name="name"
            type="text"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Date of Payment"
            autoFocus
            value={date}
            onChange={handleChange("date")}
          />
        </Grid>


        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Payment Confirmation
        </Button>
      </Grid>
    </form>
  )

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div>
    <Typography className={classes.text} fontWeight="fontWeightBold" m={1} color="primary" style={{display: createdPayment ? "" : "none"}}>
         Your Payment Confirmation is Success..
    </Typography>
    </div>
  );

  const showLoading = () => (
    loading && (<Typography className={classes.text} fontWeight="fontWeightBold" m={1} color="secondary" style={{display: createdPayment ? "" : "none"}}>
         Loading..
    </Typography>)
  );

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
          <PaymentIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Payment Confirmation
        </Typography>
       <br/>
      {showLoading()}
      {showError()}
      {showSuccess()}
      <br/>
      {newPostForm()}
      {goBack()}
      </div>
    </Container>
  );
}

export default PaymentConfirmation;
