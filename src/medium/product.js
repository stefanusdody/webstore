import React, {Component} from 'react';

import { Card,
         CardImg,
         CardBody,
         CardSubtitle,
         Col,
         } from 'reactstrap';


import PropTypes from 'prop-types';

import "../App.css";

class Product extends Component {
  render () {
    const {id, name, img, taste, price, weight } = this.props.product;
    return (

     <Col key={id} xs={12} sm={12} md={12}lg={4}>
      <Card outline color="info" className="box">
        <CardImg top width="5%" src={img} alt="Card image cap" />
        <CardBody>
          <CardSubtitle>{name}</CardSubtitle>
          <br/>
          <p>Harga :  Rp {price},- </p>
          <p>Rasa: {taste}</p>
          <p>Berat : {weight} gram</p>
        </CardBody>
      </Card>
     </Col>
   );
  };
}

Product.propTypes = {
  product:PropTypes.shape({
   id:PropTypes.number,
   img:PropTypes.string,
   name:PropTypes.string,
   price:PropTypes.string,
   weight:PropTypes.number
 }).isRequired
}

export default Product;
