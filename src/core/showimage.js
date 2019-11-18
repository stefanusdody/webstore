import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {API} from "../config";


const useStyles = makeStyles(theme => ({
    image: {
    width:"100%",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}))

const ShowImage = ({item, url}) => {
 const classes = useStyles();

 return (
   <div className="product-img">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        className={classes.image} alt={item.name}
        />
   </div>
   )
};

export default ShowImage;
