import React, {Component} from 'react';
import {
   Container,
   Row,
} from 'reactstrap';

import Product from './product';
import NavigationBarBottom from './navbarbottom'
import "../App.css";

import {ProductConsumer} from "../context";

class ListProduct extends Component {

  render () {
    return (
      <Container className="box">
        <Row >
        <ProductConsumer>
         { value => {
           return value.products.map( product => {
             return <Product key={product.id}
             product={product}
             />;
           })
         }}
        </ProductConsumer>
        </Row>
        <NavigationBarBottom/>
      </Container>
    );
  }
}

export default ListProduct;
