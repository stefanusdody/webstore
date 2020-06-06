import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import {addCourier} from './carthelpers';

const useStyles = makeStyles((theme) => ({
  Button: {
    marginTop: theme.spacing(1),
  }
}))

const AlamatService = ({service}) => {
  const classes = useStyles();

  const addService = () => {
    addCourier(service)
  }

 return (
      <CardActions>
         <Typography variant="h6" gutterBottom className={classes.text}>
           {service.city_name}
         </Typography>
      </CardActions>
    );
}

export default AlamatService;
