import React, {useState, useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardOrder from './cardorder';
import { getPurchaseHistory } from '../user/apiuser'
import { isAuthenticated } from '../auth'


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
    textAlign: "center",
    marginBottom: theme.spacing(5),
  },
  layout: {
    width: 'auto',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(8),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  message: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(20),
  }
}));


const WaitingPaymentOrder = () => {
  const classes = useStyles();
  const [history, setHistory] = useState([]);
  const { user: { _id, name }} = isAuthenticated();
  const token = isAuthenticated().token

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setHistory(data)
      }
    })
  }

  const orderStatus = history.filter(histories => (histories.status === "Tunggu Pembayaran"))

  useEffect(() => {
    init(_id, token)
  }, [])

  const searchMessage = (orderStatus) => {
    if(orderStatus.length > 0) {
      return `Terdapat ${orderStatus.length} Status Menunggu Pembayaran`
     }
     if( orderStatus.length < 1) {
       return (
         <div className={classes.message}>
         <Typography component="h1" variant="h5" >
            Halo {name}...
         </Typography>
         <br/>
         <Typography variant="subtitle1" color="textSecondary">
            Saat Ini Kamu Tidak Memiliki Pesanan dengan Status "Tunggu Pembayaran"
         </Typography>
         </div>
       )
      }
  }

return (
    <div className={classes.root}>
    <Typography gutterBottom variant="h5" component="h1">
      {searchMessage(orderStatus)}
    </Typography>
    <br/>
          <Grid container spacing={2}>
             {orderStatus.map((order, i) => (
              <Grid  key={i} item xs={12} sm={12} md={12}>
                  <CardOrder
                   order={order}
                   showViewOutletLocation={false}
                   />
              </Grid>
             ))}
          </Grid>
      </div>
  );
}

export default WaitingPaymentOrder;
