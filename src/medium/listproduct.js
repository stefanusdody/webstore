import React, {Component} from 'react';
import {
   Container,
   Row,
} from 'reactstrap';

import Product from './product';
import NavigationBarBottom from './navbarbottom'

import {ProductConsumer} from "../context";

const box = {
  marginTop: "20px",
  marginBottom: "25px",
  position: "relative",
  fontFamily: "Merriweather",
  fontFamily: "serif",
  fontFamily: "Open Sans Condensed",
  fontFamily: "sans-serif",
  textAlign: "center"
}


class ListProduct extends Component {
  render () {
    return (
      <Container style={box}>
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
