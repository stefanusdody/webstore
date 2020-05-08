import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import {addAddress} from './carthelpers';
import {isAuthenticated} from '../auth'

const useStyles = makeStyles((theme) => ({
  Button: {
    marginTop: theme.spacing(1),
  }
}))

const AddressService = ({service}) => {
  const classes = useStyles();

  const addToCart = () => {
    addAddress(service)
  }

 return (
      <CardActions>
           <Button fullWidth onClick={addToCart} variant="contained" className={classes.Button} >
             {service.service}/ Rp {service.cost[0].value} / {service.cost[0].etd} hari
           </Button>
      </CardActions>
    );
}

export default AddressService;
