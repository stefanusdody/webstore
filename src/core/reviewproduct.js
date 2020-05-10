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
import {emptyCart,emptyAddress} from "./carthelpers";
import {getBraintreeClientToken, processPayment, createOrder, getProvince, getCity} from "./apicore";
import DropIn from 'braintree-web-drop-in-react';


const useStyles = makeStyles(theme => ({
  Button: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
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

const ReviewProduct = ({products,service}) => {
const classes = useStyles();
const [ error, setError ] = useState(false);

const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: '',
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


  const handleKotaAsal = (e) => {
      const data = this.state.data
      const value = e.target.value;
      data['origin'] = value;
    }

const handleAddress = event => {
    setData({ ...data, address: event.target.value });
};

const handleTotal = event => {
    setData({ ...data, total: event.target.value });
};

const getTotal = () => {
  return products.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.count * nextValue.price
  }, 0)
}

const getNetTotal = () => {
  return getTotal() + 9000
}

const showCheckout = () => {
    return isAuthenticated() ? (
            <div>{showDropIn()}</div>
    ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  href="/signin"
                  color="secondary"
                  className={classes.Button}>
                   Sign in to checkout
                </Button>
        );
};

let deliveryAddress = data.address;
let totalChart = data.total;

const createOrderData = {
    products: products,
    transaction_id: products.id,
    amount: products.amount,
    address: deliveryAddress,
    total: totalChart
};

const buy = () => {
        setData({ ...data, loading: true });

        createOrder(userId, token, createOrderData)
            .then(response => {
                emptyCart(() => {
                    console.log('payment success and empty cart');
                    setData({
                        loading: false,
                        success: true
                    });
                });
                emptyAddress();
            })
            .catch(error => {
                console.log(error);
                setData({ loading: false });
            });
    };

const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
           <ListItem className={classes.listItem}>
              <ListItemText> Total Order</ListItemText>
              <Typography variant="body2">Rp. {getTotal()}</Typography>
              <Typography variant="body2">{products.name}</Typography>
           </ListItem>
           <ListItem className={classes.listItem}>
               <ListItemText> Shipping</ListItemText>
               <Typography variant="body2">{products.cost}</Typography>
           </ListItem>
           <ListItem className={classes.listItem}>
                 <ListItemText> Total Payment </ListItemText>
                 <Typography variant="body2"
                  value={data.total}
                  onChange={handleTotal}
                 >Rp. {getNetTotal()}</Typography>
            </ListItem>
                <Typography variant="h6" gutterBottom className={classes.title}>
                   Shipping Address
                </Typography>
                 <Grid container spacing={3}>
                   <Grid item xs={12}>
                   <label className="text-muted">Alamat</label>
                    <TextField
                     required
                     id="address1"
                     name="address1"
                     label="Alamat"
                     fullWidth
                     autoComplete="billing address-line1"
                     value={data.address}
                     onChange={handleAddress}
                    />
                  </Grid>
                </Grid>
                <br/>
                <br/>
                <Button
                 className={classes.Button}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={buy}
                >
                  Order
                </Button>

                </div>
    );

  const showError = error => (
              <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                  {error}
              </div>
          );

  const showSuccess = success => (
              <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
              <Typography variant="h5" gutterBottom>
                Terima Kasih telah Berbelanja DI TokoTukuAda.com
              </Typography>
              <Typography variant="subtitle1">
               Kami akan segera melakukan proses pengiriman setelah anda melakukan konfirmasi pembayaran
              </Typography>
              </div>
          );
const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

return (
  <Paper>
  <Container>
     {showLoading(data.loading)}
     {showSuccess(data.success)}
     {showError(data.error)}
     {showCheckout()}
  </Container>
  </Paper>
  )
}

export default ReviewProduct;
