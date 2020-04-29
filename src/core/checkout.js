import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {isAuthenticated} from '../auth';
import {emptyCart} from "./carthelpers"
import {getBraintreeClientToken, processPayment, createOrder} from "./apicore";
import DropIn from 'braintree-web-drop-in-react';

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: "center",
    marginTop: theme.spacing(10),
  },
  cardGrid: {
    marginTop: theme.spacing(2),

  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  title:{
    textAlign: "center",
  }
}))

const CheckOut = ({products, setRun = f => f, run = undefined}) => {
const classes = useStyles();
const [shipping, setShipping] = useState(products.shipping);

const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

const userId = isAuthenticated() && isAuthenticated().user._id;
const token = isAuthenticated() && isAuthenticated().token;

const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else {
                console.log(data);
                setData({ clientToken: data.clientToken });
            }
        });
    };

useEffect(() => {
      getToken(userId, token);
  }, []);

const handleAddress = event => {
    setData({ ...data, address: event.target.value });
};

const getTotal = () => {
  return products.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.count * nextValue.price
  }, 0)
}

const getNetTotal = () => {
  return getTotal() + 9000
}

const handleChange = () => event => {
  setShipping(event.target.value)
}

const showCheckout = () => {
    return isAuthenticated() ? (
            <div>{showDropIn()}</div>
    ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
};

let deliveryAddress = data.address;

const createOrderData = {
    products: products,
    transaction_id: products.id,
    amount: products.amount,
    address: deliveryAddress
};


const buy = () => {
        setData({ loading: true });
        createOrder(userId, token, createOrderData)
            .then(response => {
                emptyCart(() => {
                    setRun(!run); // run useEffect in parent Cart
                    console.log('payment success and empty cart');
                    setData({
                        loading: false,
                        success: true
                    });
                });
            })
            .catch(error => {
                console.log(error);
                setData({ loading: false });
            });
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
                <div>
                <Typography variant="h6" gutterBottom className={classes.title}>
                   Shipping address
                </Typography>
                 <Grid container spacing={3}>
                   <Grid item xs={12}>
                    <TextField
                     required
                     id="address1"
                     name="address1"
                     label="Address"
                     fullWidth
                     autoComplete="billing address-line1"
                     value={data.address}
                     onChange={handleAddress}
                    />
                  </Grid>
                </Grid>
                <br/>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={buy}
                >
                  Order
                </Button>
                </div>
        </div>
    );

  const showError = error => (
              <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                  {error}
              </div>
          );

  const showSuccess = success => (
              <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
                  Thanks! Your payment was successful!
              </div>
          );

  const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

return (
  <Paper>
  <Container disablePadding onBlur={() => setData({ ...data, error: '' })}>
     <ListItem className={classes.listItem}>
         <ListItemText> Total Order</ListItemText>
         <Typography variant="body2">Rp. {getTotal()}</Typography>
         <Typography variant="body2">{products.name}</Typography>
     </ListItem>
     <ListItem className={classes.listItem}>
         <ListItemText> Shipping</ListItemText>
         <Typography variant="body2" value={shipping} onChange={handleChange()}>Rp. 9000</Typography>
     </ListItem>
     <ListItem className={classes.listItem}>
         <ListItemText> Total Payment </ListItemText>
         <Typography variant="body2" value={shipping} onChange={handleChange()}>Rp. {getNetTotal()}</Typography>
     </ListItem>
     {showLoading(data.loading)}
     {showSuccess(data.success)}
     {showError(data.error)}
     {showCheckout()}
     <br/>
  </Container>
  </Paper>
  )
}

export default CheckOut;
