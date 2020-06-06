import React, {useState, useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardOrder from './cardorder';
import { getPurchaseHistory } from '../user/apiuser'
import { isAuthenticated } from '../auth'


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    textAlign: "center"
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


const WaitingProsesOrder = () => {
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

  const orderStatus = history.filter(histories => (histories.status === "Sedang Diproses"))

  useEffect(() => {
    init(_id, token)
  }, [])


  const searchMessage = (orderStatus) => {
    if(orderStatus.length > 0) {
      return `Terdapat ${orderStatus.length} Status Pesanan`
     }
     if( orderStatus.length < 1) {
       return (
         <div className={classes.message}>
         <Typography component="h1" variant="h5" >
            Halo {name}...
         </Typography>
         <br/>
         <Typography component="h1" variant="h5">
            Saat Ini Kamu Tidak Memiliki Pesanan dengan Status "Sedang Diproses"
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
             { orderStatus.map((order, i) => (
              <Grid  key={i} item xs={12} sm={12} md={12}>
                  <CardOrder
                   order={order}
                   showViewPayment={false}
                  />
              </Grid>
             ))}
          </Grid>

      </div>
  );
}

export default WaitingProsesOrder;
