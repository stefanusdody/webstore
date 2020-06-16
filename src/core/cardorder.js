import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { getOutlet } from './apicore'
import { isAuthenticated } from '../auth';


const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: 'none',
  },
  cardGrid: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(-10),
  },
  button: {
    marginTop: theme.spacing(2),
    fontSize: "20"
  }
}));


const CardOrder = ({
      order,
      showViewOutletLocation=true,
      showViewPayment=true,
    }) => {

  const classes = useStyles();

  const { user: { email }} = isAuthenticated();

  const showMainOutletLocation = (showViewOutletLocation) => {
    return(
      showViewPayment && (
        <ListItem>
           <Grid item xs={12} sm={12} md={12}>
           <Typography variant="body2" component="p">
             Lokasi Outlet  :
           </Typography>
                <Button
                  variant="outlined"
                  color="default"
                  fullWidth
                  className={classes.button}
                  startIcon={<RoomOutlinedIcon />}
                  href={order.outlet_location}
                >
                    Lokasi outlet
                </Button>
           </Grid>
        </ListItem>
      )
    );
  };

  const showMainPayment = (showViewPayment) => {
    return(
      showViewPayment && (
        <ListItem>
           <Grid item xs={12} sm={12} md={12}>
               <Typography variant="body2" component="p">
                 Cara Pembayaran  :
               </Typography>

                <Typography  variant="body2" component="p" color="textSecondary">
                   Silahkan Lakukan Pembayaran Melalui Link yang telah kami kirim ke alamat email :
                </Typography>
                <br/>
                <Typography  variant="body2" component="p" color="secondary">
                   {email}
                </Typography>

           </Grid>
        </ListItem>
      )
    );
  };

return (
    <Container>
    <Card className={classes.cardGrid}>
       <CardContent className={classes.cardContent}>
        <List disablePadding>

           <ListItem>
              <Grid item xs={12} sm={12} md={12}>
                  <Typography variant="body2" component="p">
                    Status Order  :
                  </Typography>
                  <Typography  variant="body2" component="p" color="textSecondary">
                    {order.status}
                  </Typography>
              </Grid>
           </ListItem>

           <ListItem>
              <Grid item xs={12} sm={12} md={12}>
                  <Typography variant="body2" component="p">
                    Order Id  :
                  </Typography>
                  <Typography  variant="body2" component="p" color="textSecondary">
                    {order._id}
                  </Typography>
              </Grid>
           </ListItem>



           <ListItem>
              <Grid item xs={12} sm={12} md={12}>
                  <Typography variant="body2" component="p">
                    Total Pembayaran  :
                  </Typography>
                  <Typography  variant="body2" component="p" color="textSecondary">
                    Rp {order.total}
                  </Typography>
              </Grid>
           </ListItem>

           <ListItem>
             <Grid  item xs={12} sm={12} md={12}>
               <Typography variant="body2" component="p">
                 Product  :
               </Typography>
            { order.products.map((p, i) => {
             return (
                <Typography key={i} variant="body2" component="p" color="textSecondary">
                {p.name}
                </Typography>
              )
            })}
             </Grid>
           </ListItem>

           <ListItem>
              <Grid item xs={12} sm={12} md={12}>
                  <Typography variant="body2" component="p">
                    Outlet Pembelian  :
                  </Typography>
                  <Typography  variant="body2" component="p" color="textSecondary">
                    {order.outlet_name}
                  </Typography>
              </Grid>
           </ListItem>
          {showMainOutletLocation(showViewOutletLocation)}
          {showMainPayment(showViewPayment)}

       </List>


       </CardContent>
      </Card>
    </Container>
    );
}

export default CardOrder;
