import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import {addCourier} from './carthelpers';


const CourierWeight = ({products}) => {
  const classes = useStyles();

  const getWeight = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.weight
    }, 0)
  }

 return (
      <CardActions>
         <Typography  gutterBottom variant="h5" component="h1">
           {getWeight()} gram
         </Typography>
      </CardActions>
    );
}

export default CourierWeight;
