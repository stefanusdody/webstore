import React, {useState, useEffect} from 'react';
import ReviewProduct from './reviewproductone';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { getCart} from "./carthelpers";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
}))

const Review = () => {
  const classes = useStyles();
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);


  return (
  <Container>
      <main className={classes.layout}>
          <Paper className={classes.paper}>
              <ReviewProduct products={items}/>
          </Paper>
      </main>
  </Container>
  )
}

export default Review;
