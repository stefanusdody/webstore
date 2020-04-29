import React from 'react';
import {API} from "../config";


const ShowImage = ({item, url}) => {

 return (
   <div className="product-img">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        alt={item.name}
        />
   </div>
   )
};

export default ShowImage;
