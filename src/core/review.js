import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckOut from './checkout';
import Container from '@material-ui/core/Container';
import {getCart} from "./carthelpers";
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

  useEffect(() => {
    setItems(getCart());
  }, []);


  const goBack = () => (
    <Grid container>
      <Grid item>
        <Link href="/cart" variant="body2">
              {"Back to Chart"}
        </Link>
      </Grid>
    </Grid>
  );


  return (
    <Container maxWidth="sm">
    <Typography className={classes.card} gutterBottom variant="h5" component="h1">
       Summary
    </Typography>
      <div>
        <CheckOut products={items}/>
      </div>
      <br/>
       {goBack()}
    </Container>
  )
}

export default Review;
