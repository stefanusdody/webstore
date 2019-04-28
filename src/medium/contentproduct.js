import React, { Component } from 'react';
import {
  Button,
  Container,
  Col,
  Card,
  CardImg,
  Row,
  Table
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
     <h4 className="text-info">Langkah Menjadi Mitra Kami</h4>
      <Row>
         <Col xs={4} sm={4} md={4} lg={4}>
             <CardImg style={borderproduct} width="100%" src={require(`../assets/daftar.png`)} alt="Card image cap" />
         </Col>
         <Col xs={4} sm={4} md={4} lg={4}>
             <CardImg style={borderproduct} top width="100%" src={require(`../assets/verifikasi.png`)} alt="Card image cap" />
         </Col>
         <Col xs={4} sm={4} md={4} lg={4}>
              <CardImg style={borderproduct} top width="100%" src={require(`../assets/pesan.png`)} alt="Card image cap" />
         </Col>
         <Col xs={4} sm={4} md={4} lg={4}>
               <CardImg style={borderproduct} top width="100%" src={require(`../assets/pembayaran.png`)} alt="Card image cap" />
         </Col>
         <Col xs={4} sm={4} md={4} lg={4}>
              <CardImg style={borderproduct} top width="100%" src={require(`../assets/pengiriman.png`)} alt="Card image cap" />
         </Col>
         <Col xs={4} sm={4} md={4} lg={4}>
              <CardImg style={borderproduct} top width="100%" src={require(`../assets/jual.png`)} alt="Card image cap" />
         </Col>

       </Row>
      </div>
      <div>
       <CardImg style={borderproduct} top width="100%" src={require(`../assets/langkah.png`)} alt="Card image cap" />
      </div>
      <br/>
      <p className="text-info">Ingin Menjadi MITRA Produk Snack Kami? Daftarkan Diri Kamu dengan Klik Dibawah Ini</p>
      <Button
       href="/signup"
       color="danger"
       size="lg"> Daftar Sekarang</Button>
    </Container>
  );
 };
}

export default ContentProduct;
