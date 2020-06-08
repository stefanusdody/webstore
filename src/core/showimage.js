import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {API} from "../config";

const useStyles = makeStyles(theme => ({
 media: {
   width:"70%",
 }
}));

const ShowImage = ({item, url}) => {
  const classes = useStyles();

 return (
   <div className="product-img">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        className={classes.media}
        alt={item.name}
        />
   </div>
   )
};

export default ShowImage;
