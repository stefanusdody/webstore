import React, { Component } from "react";
import {
  Button,
  Col,
  Card,
  CardImg,
  Row,
} from 'reactstrap';

const box = {
  paddingTop: "10px",
  paddingRight: "10px",
  paddingLeft: "10px",
  marginTop: "20px",
  marginBottom: "25px",
  position: "relative",
  fontFamily: "Merriweather",
  fontFamily: "serif",
  fontFamily: "Open Sans Condensed",
  fontFamily: "sans-serif",
  textAlign: "center"
}

class SubscribeBox extends Component {
render() {
 return (
   <div style={box}>
   <h4 className="text-info">Produk Snack Pilihan</h4>
   <br/>
    <Row>
      <Col xs={6} sm={12} md={12} lg={3}>

          <CardImg top width="100%" src={require(`../assets/keripik.png`)} alt="Card image cap" />

      </Col>
      <Col xs={6} sm={12} md={12} lg={3}>
          <CardImg top width="100%" src={require(`../assets/kacang.png`)} alt="Card image cap" />
      </Col>
      <Col xs={6} sm={12} md={12} lg={3}>
          <CardImg top width="100%" src={require(`../assets/snacktradisional.png`)} alt="Card image cap" />
      </Col>
      <Col xs={6} sm={12} md={12} lg={3}>
          <CardImg top width="100%" src={require(`../assets/permen.png`)} alt="Card image cap" />
      </Col>
    </Row>
    <br/>
    <Button
      href="/product"
      color="danger"
      size="block"> Lihat Produk </Button>
   </div>
  )};
};

export default SubscribeBox;
