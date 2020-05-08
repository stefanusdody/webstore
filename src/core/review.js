import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReviewProduct from './reviewproduct';
import AddressService from './addressservice'
import Container from '@material-ui/core/Container';
import {getCart} from "./carthelpers";
import {getAddress} from "./carthelpers";
import { makeStyles } from '@material-ui/core/styles';

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

const Review = () => {
  const classes = useStyles();

  const [ items, setItems ] = useState([]);
  const [ address, setAddress ] = useState([]);


  useEffect(() => {
    setItems(getCart());
    setAddress(getAddress())
  }, []);


  const goBack = () => (
    <Grid container>
      <Grid item>
        <Link href="/checkout" variant="body2">
              {"Back to Chart"}
        </Link>
      </Grid>
    </Grid>
  );


  return (
    <Container maxWidth="sm">
    <Typography className={classes.card} gutterBottom variant="h5" component="h1">
       Order Summary
    </Typography>
      <div>
        <ReviewProduct products={items}/>
      </div>
      <div>
      { address.map((service, i) => (
        <Grid  key={i} item xs={6} sm={6} md={3}>
           <Typography  gutterBottom variant="h5" component="h1">
             {service.service}
           </Typography>
           <Typography  gutterBottom variant="h5" component="h1">
             {service.cost[0].value}
           </Typography>
        </Grid>
      ))}
      </div>
      <br/>
       {goBack()}
    </Container>
  )
}

export default Review;
