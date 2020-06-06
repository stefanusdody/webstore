import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { addCourier } from './carthelpers';

const useStyles = makeStyles((theme) => ({
  Button: {
    marginTop: theme.spacing(1),
  }
}))

const CourierService = ({service}) => {
  const classes = useStyles();

const addService = () => {
    addCourier(service)
  }


 return (
      <CardActions>
           <Button fullWidth onClick={addService} variant="contained" color="primary" className={classes.Button} href="/reviewcart" >
             {service.service}/ Rp {service.cost[0].value} / {service.cost[0].etd} hari
           </Button>
      </CardActions>
    );
}

export default CourierService;
