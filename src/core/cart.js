import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CardProduct from './card';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {getCart} from "./carthelpers";
import {isAuthenticated} from '../auth'


const useStyles = makeStyles(theme => ({
  card: {
    textAlign: "center",
    marginTop: theme.spacing(10),
  },
  cardTwo: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    height: '10%',
    display: 'flex',
    flexDirection: 'column',
  }
}))

const Cart = () => {
  const classes = useStyles();

  const [ items, setItems ] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = (items) => {
    return(
      <div>
      <Grid container spacing={4}>
       {items.map((product, i) => (
        <Grid key={i} item xs={12} sm={12} md={12}>
         <CardProduct
           className={classes.cardGrid}
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
      </div>
    )
  }

  const noItemMessage = () => (
    <Typography color="secondary" className={classes.card} gutterBottom variant="h5" component="h1">
       Your Cart is empty
    </Typography>
  )

  const goBack = () => (
    <Grid container>
      <Grid item>
        <Link href="/shop" variant="body2">
              {"Continue Shopping"}
        </Link>
      </Grid>
    </Grid>
  );

  const showNext = () => {
    return isAuthenticated() ? (
      <Button
       type="submit"
       fullWidth
       variant="contained"
       size="small"
       color="primary"
       href="/reviewcart"
       >
        Next
      </Button>
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

  return (
    <Container maxWidth="sm">
      <Typography className={classes.card} gutterBottom variant="h5" component="h1">
         Your Cart List
      </Typography>
       {items.length > 0 ? showItems(items) : noItemMessage()}
       <br/>
       {goBack()}
       <br/>
       <div>
       {showNext()}
       </div>
    </Container>
  )
}

export default Cart;
