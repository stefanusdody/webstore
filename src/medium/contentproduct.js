import React, { Component } from 'react';
import {

  Container,
  Col,

  CardImg,
  Row,

  } from 'reactstrap';

const box = {
  marginTop: "50px",
  marginBottom: "25px",
  position: "relative",
  fontFamily: "Merriweather",
  fontFamily: "serif",
  fontFamily: "Open Sans Condensed",
  fontFamily: "sans-serif",
  textAlign: "center"
}

const borderproduct = {
  marginTop: "15px",
}

class ContentProduct extends Component {
  render() {
  return (
    <Container style={box}>
     <div>
      <Row>
         <Col xs={12} sm={4} md={4} lg={4}>
             <CardImg style={borderproduct} width="100%" src={require(`../assets/produk.png`)} alt="Card image cap" />
         </Col>
         <Col xs={12} sm={4} md={4} lg={4}>
             <CardImg style={borderproduct} width="100%" src={require(`../assets/mutu.png`)} alt="Card image cap" />
         </Col>
         <Col xs={12} sm={4} md={4} lg={4}>
             <CardImg style={borderproduct} top width="100%" src={require(`../assets/pengiriman.png`)} alt="Card image cap" />
         </Col>
       </Row>
      </div>
    </Container>
  );
 };
}

export default ContentProduct;
