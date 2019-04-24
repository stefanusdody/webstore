import React, { Component } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  CardImg,
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
     <h4 className="text-info">Langkah Menjadi Reseller</h4>
      <Row>
         <Col xs={3} sm={3} md={3} lg={3}>

           <CardImg style={borderproduct} width="70%" src={require(`../assets/clipboard.png`)} alt="Card image cap" />
           <br/>
           <p style={borderproduct}>DAFTAR</p>
         </Col>
         <Col xs={3} sm={3} md={3} lg={3}>
             <CardImg style={borderproduct} top width="100%" src={require(`../assets/whatsapp.png`)} alt="Card image cap" />
             <br/>
             <p style={borderproduct}>VERIFIKASI</p>
         </Col>
         <Col xs={3} sm={3} md={3} lg={3}>
              <CardImg style={borderproduct} top width="100%" src={require(`../assets/menu.png`)} alt="Card image cap" />
              <br/>
              <p style={borderproduct}>PESAN</p>
           </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
              <CardImg style={borderproduct} top width="100%" src={require(`../assets/order.png`)} alt="Card image cap" />
              <br/>
              <p style={borderproduct}>KIRIM</p>
          </Col>
       </Row>
      </div>

      <p className="text-info">Ingin Menjadi Reseller Produk Snack? Daftarkan Diri Kamu dengan Klik Dibawah Ini</p>
      <Button
       href="/signup"
       color="danger"
       size="lg"> Daftar Sekarang</Button>
    </Container>
  );
 };
}

export default ContentProduct;
