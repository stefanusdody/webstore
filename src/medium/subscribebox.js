import React, { Component } from "react";
import {
  Button,
  Col,
  CardImg,
  Row,
} from 'reactstrap';

const box = {
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
        <CardImg top width="100%" src={require(`../assets/telur gabus keju.png`)} alt="Card image cap" />
      </Col>
      <Col xs={6} sm={12} md={12} lg={3}>
        <CardImg top width="100%" src={require(`../assets/singkong balado.png`)} alt="Card image cap" />
      </Col>
      <Col xs={6} sm={12} md={12} lg={3}>
        <CardImg top width="100%" src={require(`../assets/kacang atom.png`)} alt="Card image cap" />
      </Col>
      <Col xs={6} sm={12} md={12} lg={3}>
        <CardImg top width="100%" src={require(`../assets/sumpia ebi.png`)} alt="Card image cap" />
      </Col>
    </Row>
    <br/>
    <Button
      href="/product"
      color="info"
      size="block"> Lihat Produk </Button>
   <br/>

   <h4 className="text-info">Jenis Snack</h4>
   <br/>
    <Row>
      <Col xs={3} sm={3} md={3} lg={3}>
        <CardImg top width="100%" src={require(`../assets/chips.png`)} alt="Card image cap" />
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <CardImg top width="100%" src={require(`../assets/peanut.png`)} alt="Card image cap" />
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <CardImg top width="100%" src={require(`../assets/traditional.png`)} alt="Card image cap" />
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <CardImg top width="100%" src={require(`../assets/candy.png`)} alt="Card image cap" />
      </Col>
    </Row>

   </div>
  )};
};

export default SubscribeBox;
