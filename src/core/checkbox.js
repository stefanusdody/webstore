import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(0),
  },
}));

const CheckBoxes = ({ categories, handleFilters }) => {
  const classes = useStyles();

  const [checked, setChecked] = useState([])

  const handleToggle = c => () => {
    // return the first index or -1
     const currentCategoryId = checked.indexOf(c)
     const newCheckedCategoryId = [...checked]

     // if currently checked was not already in checked state > push
     // else pull/take off
     if(currentCategoryId === -1) {
       newCheckedCategoryId.push(c)
     } else {
       newCheckedCategoryId.splice(currentCategoryId, 1)
     }
     console.log(newCheckedCategoryId);
     setChecked(newCheckedCategoryId);
     handleFilters(newCheckedCategoryId)
  }

  return categories.map((c, i) => (
    <div key={i} className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend"></FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox color="primary" onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} />}
            label={c.name}
          />
        </FormGroup>
      </FormControl>
    </div>
  ))
}

export default CheckBoxes;
