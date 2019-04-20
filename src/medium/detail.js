import React, { Component } from 'react';

import {ProductConsumer} from "../context"

import "../App.css"

class ProductDetail extends Component {
render() {
  return (
      <ProductConsumer>
      {value => {
        console.log(value.detailProducts);
      }}
      </ProductConsumer>

   );
 };
}

export default ProductDetail;
