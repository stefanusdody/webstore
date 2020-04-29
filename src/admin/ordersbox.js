import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    paddingLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
  labelControl: {
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    fontSize: "15px"
  },
}));

const OrderBoxes = ({ orderstatus, handleFilters }) => {
  const classes = useStyles();

  const handleChange = () => {

  };

  return orderstatus.map((p, i) => (
    <div key={i} className={classes.root}>
     <input
          onChange={handleChange}
          value={`${p._id}`}
          name={p}
          type="radio"
          className={classes.formControl}
          color="danger"
        />
        <label className={classes.labelControl}>{p.name}</label>
    </div>
  ))
}

export default OrderBoxes;
