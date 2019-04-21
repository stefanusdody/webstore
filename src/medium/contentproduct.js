import React, { Component } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
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

const borderproduct = {
  marginTop: "15px",
}

class ContentProduct extends Component {
  render() {
  return (
    <Container style={box}>
     <div>
     <CardTitle>Langkah Membeli Snack Favorite Kamu</CardTitle>
      <Row>
         <Col xs={6} sm={6} md={6} lg={3}>
           <Card body style={borderproduct}>
           <CardTitle>Langkah 1</CardTitle>
           <CardImg width="70%" src={require(`../assets/clipboard.png`)} alt="Card image cap" />
           <br/>
           <CardTitle>Daftar</CardTitle>
           <p>Daftarkan Diri Kamu Untuk Memulai Pembelian Snack </p>
           </Card>
         </Col>
         <Col xs={6} sm={6} md={6} lg={3}>
            <Card body style={borderproduct}>
             <CardTitle>Langkah 2</CardTitle>
             <CardImg top width="100%" src={require(`../assets/whatsapp.png`)} alt="Card image cap" />
             <br/>
             <CardTitle>Verifikasi</CardTitle>
             <p>Kami Akan Segera Menghubungi Kamu Melalui Whatsapp  </p>
             </Card>
         </Col>
         <Col xs={6} sm={6} md={6} lg={3}>
             <Card body style={borderproduct}>
              <CardTitle>Langkah 3</CardTitle>
              <CardImg top width="100%" src={require(`../assets/menu.png`)} alt="Card image cap" />
              <br/>
              <CardTitle>Pilih Produk</CardTitle>
              <p>Kamu Bebas Untuk Memilih Produk Snack Favorite </p>
              </Card>
           </Col>
          <Col xs={6} sm={6} md={6} lg={3}>
             <Card body style={borderproduct}>
              <CardTitle>Langkah 4</CardTitle>
              <CardImg top width="100%" src={require(`../assets/order.png`)} alt="Card image cap" />
              <br/>
              <CardTitle>Pengiriman</CardTitle>
              <p>Kami Akan Mengirimkan Produk ke Kamu</p>
             </Card>
          </Col>
       </Row>
      </div>
      <br/>
      <p>Ingin Berbelanja Snack Favorite Kamu? Daftarkan Diri Kamu dengan Klik Dibawah Ini</p>
      <Button
       href="/signup"
       color="danger"
       size="lg"> Daftar Sekarang</Button>
    </Container>
  );
 };
}

export default ContentProduct;
