import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import StoreIcon from '@material-ui/icons/Store';
import Link from '@material-ui/core/Link';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { isAuthenticated} from '../auth';
import { getCart, emptyCart, getAddress, getCourier, itemTotal, emptyCourier, emptyAddress } from "./carthelpers";
import { createOrder, getAllOutlets} from "./apicore"


const useStyles = makeStyles(theme => ({
  Button: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  ButtonCheckout: {
    marginTop: theme.spacing(10),
  },
  BottomBar: {
    top: 'auto',
    bottom: 0,
  },
  card: {
    marginTop: theme.spacing(3),

  }
}))

const ReviewProduct = ({products}) => {
const classes = useStyles();


const [values, setValues] = useState({
      courier_name: "",
      error: '',
      date_pickers: "",
      time_pickers: '',
      loading: false,
      success: false,
});

const [ outlets, setOutlets ] = useState([]);
const { loading, success, error, courier_name, date_pickers, time_pickers } = values;
const [ deliveryAddress, setDeliveryAddress ] = useState([]);
const [ courierService, setCourierService ] = useState([]);
const [ cart, setCart ] = useState([]);


const userId = isAuthenticated() && isAuthenticated().user._id;
const token = isAuthenticated() && isAuthenticated().token;


useEffect(() => {
      setDeliveryAddress(getAddress());
      setCourierService(getCourier());
      setCart(getCart())
      init()
  }, []);

  const init = () => {
    getAllOutlets().then(data => {
      if(data.error) {
        setValues({ ...values, error: data.error, loading: false})
      } else {
        setOutlets(data)
      }
    });
  };

  const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };


const handleTotal = event => {
    setValues({ ...values, total: event.target.value });
};

const getTotal = () => {
  return products.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.count * nextValue.price
  }, 0)
}

const getWeight = () => {
  return courierService.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.cost[0].value
  }, 0)
}

const getNetTotal = () => {
  return getTotal() + getWeight()
}

const getCourierName = () => {
  return deliveryAddress.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.courier
  },[])
}

const getCourierService = () => {
  return courierService.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.description
  },[])
}

const getCourierFee = () => {
  return courierService.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.cost[0].value
  },[])
}

const getStreetAddress = () => {
  return deliveryAddress.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.alamat
  },[])
}

const getCityAddress = () => {
  return deliveryAddress.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.kelurahan
  },[])
}

const getPostal = () => {
  return deliveryAddress.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.postal
  },[])
}

const getAddressId = () => {
  return deliveryAddress.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.destination
  },[])
}


const createOrderData = {
    products: products,
    transaction_id: products.id,
    amount: products.amount,
    address: getStreetAddress(),
    city: getCityAddress(),
    postal_code: getPostal(),
    courier_name: getCourierName(),
    courier_service: getCourierService(),
    courier_fee: getCourierFee(),
    address_id: getAddressId(),
    total: getNetTotal()
};

const buy = () => {
        setValues({ ...values, error: false, loading: true});

        createOrder(userId, token, createOrderData, {courier_name})
            .then(data => {
              if(data.error){
                setValues({ ...values, error: data.error, loading: false})
              } else {
                 emptyCart();
                 emptyCourier();
                 emptyAddress();
                 setValues({
                   ...values,
                   loading: false,
                   success: true
                 });
              }

            })

    };


const showBottomNavigation = () => {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      className={classes.BottomBar}>
      <Grid container>

        <Grid item xs={6} sm={6}>
          <Link color="inherit" href="/shop">
            <ListItem>
              <ListItemText align="center"> <StoreIcon /> Kembali Belanja </ListItemText>
            </ListItem>
          </Link>
        </Grid>

        <Grid item xs={6} sm={6}>
         <Link color="inherit" href="/cart">
            <ListItem>
               <ListItemText align="center">
                  <Badge color="primary" badgeContent={itemTotal()}>
                     <ShoppingCartIcon/>
                  </Badge>
                  Keranjang </ListItemText>
            </ListItem>
         </Link>
        </Grid>
      </Grid>
    </AppBar>
  )
}

const showError = () => {
  if(error) {
    return <Typography fontWeight="fontWeightBold" m={1} style={{display: error ? "" : "none"}} color="secondary">
     {error}
    </Typography>
  }
}

const showSuccess = () => (
      success && (
        <Redirect to="/orderlist" />
      )
    )

const showLoading = () => (
      loading && (
        <LinearProgress />
      )
  );

  const showStatus = (status) => {
      return status.role > 0 ?
      <Typography variant="caption" display="block" gutterBottom>
        Status Toko : Buka
      </Typography>
        :
      <Typography variant="caption" display="block" color="secondary" gutterBottom>
        Status Toko : Tutup
      </Typography>
     }

return (
  <Container>
     {showLoading()}
     {showSuccess()}
     {showError()}

     {isAuthenticated() && (
       <div>
       <Typography variant="h6" gutterBottom className={classes.card} align="center">
         Order Summary
       </Typography>
       <br/>
       <form className={classes.container} noValidate>
        {outlets.map((outlet, i) => (
         <Grid key={i} item xs={12} sm={12} md={12}>
           <Typography
             gutterBottom
             variant="p"
             component="h6"
             align="left"
             value={outlet.name}
             >
             {outlet.name}
           </Typography>
           <Typography variant="caption" display="block" gutterBottom>
             {outlet.address}
           </Typography>
           <Typography variant="caption" display="block" gutterBottom>
             {outlet.city}
           </Typography>
           <br/>
           {showStatus(outlet.status)}

           <Typography variant="h6" gutterBottom className={classes.card}>
            Jadwal Pengambilan
           </Typography>
           <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} align="center">
                  <TextField
                   id="date"
                   fullWidth
                   label="Tanggal"
                   type="date"
                   value={date_pickers}
                   onChange={handleChange("date_pickers")}
                   className={classes.textField}
                   InputLabelProps={{
                   shrink: true,
                   }}
                  />
              </Grid>
              <Grid item xs={12} sm={12} md={6} align="center">
                  <TextField
                   id="time"
                   fullWidth
                   label="Jam"
                   type="time"
                   value={time_pickers}
                   onChange={handleChange("time_pickers")}
                   className={classes.textField}
                   InputLabelProps={{
                   shrink: true,
                  }}
              />
           </Grid>
           </Grid>
           <br/>
        </Grid>
       ))}

       </form>
        <Typography variant="h6" gutterBottom className={classes.card}>
         Produk Pesanan
        </Typography>
         <TableContainer>
              <Table>
                 <TableHead>
                     <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="center">Kuantitas</TableCell>
                        <TableCell align="right">Harga</TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                   { cart.map((r, i) => (
                    <TableRow key={i}>
                        <TableCell align="left">{r.name}</TableCell>
                        <TableCell align="center">{r.count}</TableCell>
                        <TableCell align="right">{r.price * r.count}</TableCell>
                    </TableRow>
                    ))}
                    <TableRow>
                       <TableCell rowSpan={2} />
                       <TableCell colSpan={1}>Sub Total</TableCell>
                       <TableCell align="right">{getTotal()}</TableCell>
                    </TableRow>
                    { courierService.map((r, i) => (
                    <TableRow key={i}>
                       <TableCell>Pengiriman</TableCell>
                       <TableCell align="right" value={r.cost[0].value}>{r.cost[0].value}</TableCell>
                    </TableRow>
                    ))}
                    <TableRow>
                       <TableCell >Total</TableCell>
                       <TableCell align="right" value={getNetTotal} onChange={handleTotal}>{getNetTotal()}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
           </TableContainer>
             <Button
               className={classes.Button}
               type="submit"
               fullWidth
               variant="outlined"
               color="inherit"
               onClick={buy}
             >
               Order
             </Button>
       </div>
     )}

     {!isAuthenticated() && (
      <div className={classes.ButtonCheckout} >
      <Typography variant="h6" gutterBottom color="secondary" align="center">
        Silahkan Masuk Terlebih Dahulu
      </Typography>
       <Button
          type="submit"
          fullWidth
          variant="outlined"
          href="/signin"
          color="primary"
          className={classes.Button}>
          Sign In
       </Button>
      </div>
     )}


     {showBottomNavigation()}
  </Container>

  )
}

export default ReviewProduct;
