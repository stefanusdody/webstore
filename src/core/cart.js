import React, {useState, useEffect} from 'react';
import CardProduct from './card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import StoreIcon from '@material-ui/icons/Store';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { getCart, emptyCourier, emptyAddress} from "./carthelpers";

const useStyles = makeStyles(theme => ({
  BottomBar: {
    top: 'auto',
    bottom: 0,
  },
  cardGrid: {
    height: '50%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(15),
  },
  cardTwo: {
    marginTop: theme.spacing(30),
    textAlign: "center",
  },
  container: {
    marginBottom: theme.spacing(10),
  },
  button: {
    marginBottom: theme.spacing(2)
  }
}))


const Cart = () => {
  const classes = useStyles();
  const [ items, setItems ] = useState([]);


  useEffect(() => {
    setItems(getCart());
  }, []);

  const getEmpty = () => {
      emptyCourier();
      emptyAddress()
  };

  const showItems = (items) => {
    return(
      <div>
      <Container  maxWidth="md" className={classes.container}>
        <Grid container spacing={4}>
         {items.map((product, i) => (
           <Grid key={i} item xs={12} sm={12} md={12} className={classes.cardGrid} >
            <CardProduct
              key={i}
              product={product}
              showViewProductButton={false}
              showViewPrice={false}
              showViewDescriptions={false}
              showViewCategories={false}
              showAddedProduct={false}
              showViewAddCart={false}
              cartUpdate={true}
              showRemoveProductButton={true}
           />
        </Grid>
         ))}
       </Grid>
       <br/>
       <Button
         className={classes.button}
         fullWidth
         variant="contained"
         size="small"
         color="primary"
         href="/pickers"
         onClick={getEmpty}
         >
         Pickup
       </Button>
       <Button
         fullWidth
         variant="contained"
         size="small"
         color="primary"
         href="/address"
         onClick={getEmpty}
         >
         Delivery
       </Button>
      </Container>
      </div>
    )
  };

  const noItemMessage = () => (
   <Container className={classes.cardTwo} maxWidth="md">
    <Typography color="secondary" gutterBottom variant="h5" component="h1">
       - Keranjang Kamu Kosong -
    </Typography>
    <Button href="/shop">
      Kembali belanja
    </Button>
   </Container>
  )

  return (
    <Container maxWidth="sm">
       {items.length > 0 ? showItems(items) : noItemMessage()}
       <br/>
        <AppBar
          position="fixed"
          color="inherit"
          className={classes.BottomBar}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Link color="inherit" href="/shop">
                <ListItem>
                  <ListItemText align="center"> <StoreIcon /> Kembali Belanja </ListItemText>
                </ListItem>
              </Link>
            </Grid>
          </Grid>
        </AppBar>
    </Container>
  )
}

export default Cart;
