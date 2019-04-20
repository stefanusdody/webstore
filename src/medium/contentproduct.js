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
import "../App.css"

class ContentProduct extends Component {
  render() {
  return (
    <Container className="box">

     <div className="box">
     <h1>Langkah Membeli Snack Favorite Kamu</h1>
      <Row>
         <Col xs={6} sm={6} md={6} lg={3}>
           <Card outline color="info" body className="borderproduct">
           <CardTitle>Langkah 1</CardTitle>
           <CardImg width="70%" src={require(`../assets/clipboard.png`)} alt="Card image cap" />
           <br/>
           <CardTitle>Daftar</CardTitle>
           <p>Segera Daftarkan Diri Kamu Sekarang</p>
           </Card>
         </Col>
         <Col xs={6} sm={6} md={6} lg={3}>
            <Card outline color="info" body className="borderproduct">
            <CardTitle>Langkah 2</CardTitle>
            <CardImg top width="100%" src={require(`../assets/whatsapp.png`)} alt="Card image cap" />
            <br/>
            <CardTitle>Verifikasi</CardTitle>
            <p>Kami Akan Segera Menghubungi Kamu  </p>
            </Card>
         </Col>
         <Col xs={6} sm={6} md={6} lg={3}>
             <Card outline color="info" body className="borderproduct">
             <CardTitle>Langkah 3</CardTitle>
             <CardImg top width="100%" src={require(`../assets/menu.png`)} alt="Card image cap" />
             <br/>
             <CardTitle>Pilih Produk</CardTitle>
             <p>Kamu Bebas Untuk Memilih Produk Snack Favorite </p>
             </Card>
           </Col>
          <Col xs={6} sm={6} md={6} lg={3}>
             <Card outline color="info" body className="borderproduct">
             <CardTitle>Langkah 4</CardTitle>
             <CardImg top width="100%" src={require(`../assets/order.png`)} alt="Card image cap" />
             <br/>
             <CardTitle>Pengiriman</CardTitle>
             <p>Kami Mengurus Packing dan Pengiriman Produk</p>
             </Card>
          </Col>
       </Row>
      </div>
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
