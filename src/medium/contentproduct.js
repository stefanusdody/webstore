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
      <br/>
      <Table>
        <thead>
          <tr className="text-info">
            <th>No</th>
            <th>Langkah</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Daftarkan Diri Kamu Untuk Memulai Menjadi Mitra Produk Snack Kami</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Kami Akan Segera Melakukan Verifikasi Dengan Menghubungi Kamu</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Setelah Dilakukan Verifikasi Kamu Dapat Memesan Snack Favorite Kamu</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Setelah Melakukan Pemesanan Produk, Kamu Dapat Melakukan Proses Pembayaran</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Setelah Kami Menerima Pembayaran, Kami Akan Segar Memproses Pengiriman Produk Pesanan Dalam Waktu 2x24 Jam</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Mitra Kami Bebas Melakukan Penjualan Dimana Saja Tanpa Biaya Apapun</td>
          </tr>
        </tbody>
      </Table>
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
