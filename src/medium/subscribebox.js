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

import "../App.css"

class SubscribeBox extends Component {
render() {
 return (
   <Container className="box">
   <Card outline color="info" body className="borderproduct">
   <h1>Jenis Snack</h1>
   <br/>
    <Row>
      <Col xs={3} sm={3} md={3} lg={3}>
        <CardImg top width="100%" src={require(`../assets/chips.png`)} alt="Card image cap" />
        <CardTitle>Snack Keripik</CardTitle>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <CardImg top width="100%" src={require(`../assets/peanut.png`)} alt="Card image cap" />
        <CardTitle>Snack Kacang</CardTitle>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <CardImg top width="100%" src={require(`../assets/traditional.png`)} alt="Card image cap" />
        <CardTitle>Snack Jadoel</CardTitle>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <CardImg top width="100%" src={require(`../assets/candy.png`)} alt="Card image cap" />
        <CardTitle>Permen</CardTitle>
      </Col>
    </Row>
  </Card>
   <br/>
   <Card outline color="info" body className="borderproduct">
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
   <Card outline color="info" body className="borderproduct">
   <h2> Harga Pas Dikantong </h2>
   <p> Kami Menjual Snack Terbaik Dengan Harga Grosir Serba Rp 10.000,- </p>
   </Card>
   </Container>
  )};
};

export default SubscribeBox;
