import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import TextField from '@material-ui/core/TextField';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {isAuthenticated} from '../auth';
import {emptyCart} from "./carthelpers"
import {getBraintreeClientToken, processPayment, createOrder} from "./apicore";
import DropIn from "braintree-web-drop-in-react"

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: "center",
    marginTop: theme.spacing(10),
  },
  cardGrid: {
    marginTop: theme.spacing(2),

  },
  text:{
    textAlign: "center",
  }
}))

const CheckOut = ({products}) => {
  const classes = useStyles();

  const { user: { _id, name, email, role}} = isAuthenticated();

  const [ data, setData ] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: ""
  })

  // braintree
  const userId = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if(data.error) {
        setData({...data, error: data.error})
      } else {
        setData({clientToken: data.clientToken})
      }
    })
  }

  useEffect(() => {
   getToken(userId, token)
   },[])

   const handleAddress = event => {
     setData({...data, address: event.target.value})
   };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    },0)
  }

  let deliveryAddress = data.address

  const buy = () => {
  // send the nonce to your server
  // nonce = data.instance.requestPaymentMethod()
  let nonce;
  let getNonce = data.instance
  .requestPaymentMethod()
  .then(data => {
    // console.log(data)
    nonce = data.nonce;
    // once you have nonce(card type, card number) send nonce as "paymentMethodNonce"
    // and also total to be charged
    // console.log('send nonce and total to process: ', nonce, getTotal(products));
    const paymentData = {
      paymentMethodNonce: nonce,
      amount: getTotal(products)
    }
    processPayment(userId, token, paymentData)
    .then(response => {
      console.log(response);
      // empty cart
      // create order

      const createOrderData = {
        products: products,
        transaction_id: response.transaction.id,
        amount: response.transaction.amount,
        address: deliveryAddress
      }

      createOrder(userId, token, createOrderData)
       .then(response => {
         emptyCart(() => {
           console.log("payment success and empty cart");
           setData({ loading: false, success: true });
         })
       })
       .catch(error => {
         console.log(error);
         setData({ loading: false });
       });

    })
    .catch(error => {
      console.log(error);
      setData({ loading: false});
    });

  })


  .catch(error => {
    // console.log('dropin error: ', error)
    setData({ ...data, error: error.message});
  });
}


const showNext = () => {
  return isAuthenticated() ? (
    <div>{showDropIn()}</div>
  ):(
    <Button
      type="submit"
      fullWidth
      variant="contained"
      size="small"
      href="/signin"
      color="secondary">
      Sign In to Next
    </Button>
  )
}

  //braintree
  const showDropIn = () => (
  <div>
    {data.clientToken !== null && products.length > 0 ? (
    <Grid container spacing={4}>
     <Grid item xs={12} sm={12} md={12}>
     <div>
       <Typography variant="h6" gutterBottom>
         Shipping Address
       </Typography>
         <ListItem button>
           <ListItemIcon>
              <AccountCircleIcon/>
           </ListItemIcon>
           <ListItemText> {name}  </ListItemText>
         </ListItem>

         <ListItem button>
            <ListItemIcon>
               <MailIcon />
            </ListItemIcon>
            <ListItemText> {email} </ListItemText>
         </ListItem>

         <ListItem button>
            <ListItemIcon>
               <PhoneIcon />
            </ListItemIcon>
            <ListItemText> 08902012974920 </ListItemText>
         </ListItem>

          <ListItem button>
             <ListItemIcon>
                <AddLocationIcon/>
             </ListItemIcon>
             <ListItemText>
                <TextField
                 fullWidth
                 label="Input Your Address"
                 onChange={handleAddress}
                 className='form-control'
                  value={data.address}
                />
             </ListItemText>
          </ListItem>

          <ListItem button>
             <ListItemIcon>
                <AddLocationIcon/>
             </ListItemIcon>
             <ListItemText>
                <TextField
                 required
                 id="city"
                 name="city"
                 label="City"
                 fullWidth
                 autoComplete="billing address-level2"
                />
             </ListItemText>
          </ListItem>

          <ListItem button>
             <ListItemIcon>
                <AddLocationIcon/>
             </ListItemIcon>
             <ListItemText>
                <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="billing postal-code"
                />
             </ListItemText>
          </ListItem>

          <ListItem button>
             <ListItemIcon>
                <AddLocationIcon/>
             </ListItemIcon>
             <ListItemText>
                <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="billing country"
                />
             </ListItemText>
          </ListItem>
    </div>
  </Grid>
     <Grid item xs={12} sm={12} md={12}>
       <DropIn
          options={{ authorization: data.clientToken }}
          onInstance={instance => (data.instance = instance)}/>
       <Button
        type="submit"
        fullWidth
        variant="contained"
        fullWidth
        size="small"
        color="secondary"
        onClick={buy}
        >
        Order Now
        </Button>
    </Grid>
  </Grid>
    ) : null}
 </div>
)

const showError = error => (
 <Typography variant="h4" gutterBottom color='secondary' className={classes.text}  style={{display: error ? "" : "none"}}>
    {error}
 </Typography>
);

const showSuccess = success => (
 <Typography variant="h4" gutterBottom color='primary' className={classes.text}  style={{display: success ? "" : "none"}}>
    Thanks! Your Order was succesful!
 </Typography>
);

return (
    <React.Fragment>

         <Grid  container spacing={4}>
             <Grid item xs={12} sm={12} md={12}>
             {showSuccess(data.success)}
             {showError(data.error)}
             <Typography variant="h6" gutterBottom className={classes.title}>
               Order Summary
             </Typography>
               <ListItem>
                  <ListItemText>Total</ListItemText>
                  <Typography variant="body2">Rp {getTotal()}</Typography>
               </ListItem>
               <ListItem >
                  <ListItemText>Shipping</ListItemText>
                  <Typography variant="body2" >Free</Typography>
               </ListItem>
               <hr/>
               <ListItem >
                  <ListItemText>Total Payment </ListItemText>
                  <Typography variant="body2">Rp {getTotal()}</Typography>
               </ListItem>
               <hr/>
               </Grid>
               <Grid item xs={12} sm={12} md={12}>
            </Grid>
        </Grid>
        {showNext()}
    </React.Fragment>
  )
}

export default CheckOut;
