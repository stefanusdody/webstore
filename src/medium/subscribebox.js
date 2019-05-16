import React, { Component } from "react";
import {
  Button,
  Col,
  Card,
  CardImg,
  Container,
  Row,
} from 'reactstrap';

const box = {
  padding: "10px",
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

class SubscribeBox extends Component {
render() {
 return (
   <Container style={box}>
    <div style={box}>
    <h4 className="text-info">Pilih Produk Snack Pilihan</h4>
    <Row>
      <Col xs={6} sm={3} md={3} lg={3}>
         <CardImg style={borderproduct} width="100%" src={require(`../assets/keripik.png`)}  alt="Card image cap" />
      </Col>
      <Col xs={6} sm={3} md={3} lg={3}>
         <CardImg style={borderproduct} top width="100%" src={require(`../assets/kacang.png`)} alt="Card image cap" />
      </Col>
      <Col xs={6} sm={3} md={3} lg={3}>
         <CardImg style={borderproduct} top width="100%" src={require(`../assets/snacktradisional.png`)}alt="Card image cap" />
      </Col>
      <Col xs={6} sm={3} md={3} lg={3}>
          <CardImg style={borderproduct} top width="100%" src={require(`../assets/permen.png`)}alt="Card image cap" />
      </Col>
    </Row>

   </div>
   <Button
     href="/product"
     outline color="info"
     size="block"> Lihat Produk
   </Button>
   </Container>
  )};
};

export default SubscribeBox;
