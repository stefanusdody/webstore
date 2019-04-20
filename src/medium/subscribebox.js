import React, { Component } from "react";
import {
  Button,
  Col,
  Card,
  CardTitle,
  CardImg,
  Container,
  Row,
} from 'reactstrap';

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


class SubscribeBox extends Component {
render() {
 return (
   <Container style={box}>
   <Card outline color="info" body >
   <h1>Jenis Snack</h1>
   <br/>
    <Row>
      <Col xs={3} sm={3} md={3} lg={3}>
        <CardImg top width="100%" src={require(`../assets/chips.png`)} alt="Card image cap" />
        <p>Keripik</p>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <CardImg top width="100%" src={require(`../assets/peanut.png`)} alt="Card image cap" />
        <p>Kacang</p>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <CardImg top width="100%" src={require(`../assets/traditional.png`)} alt="Card image cap" />
        <p>Jadoel</p>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <CardImg top width="100%" src={require(`../assets/candy.png`)} alt="Card image cap" />
        <p>Permen</p>
      </Col>
    </Row>
  </Card>
   <br/>
   <Card outline color="info" body>
   <h1>Produk Snack</h1>
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
      size="lg"> Lihat Produk </Button>
   </Card>
   <br/>
   <Card outline color="info" body >
   <h2> Harga Pas Dikantong </h2>
   <p> Kami Menjual Snack Terbaik Dengan Harga Grosir Serba Rp 10.000,- </p>
   </Card>
   </Container>
  )};
};

export default SubscribeBox;
