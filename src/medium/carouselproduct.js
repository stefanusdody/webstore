import React, { Component } from 'react';
import {
         Badge,
         CardImg
         } from 'reactstrap';

import Adirasa from "../assets/head.png";

const box = {
  paddingRight: "10px",
  paddingLeft: "10px",
  marginTop: "20px",
  marginBottom: "25px",
  position: "relative",
  fontFamily: 'Merriweather',
  fontFamily: "serif",
  fontFamily: "Open Sans Condensed",
  fontFamily: "sans-serif",
  textAlign: "center",
}

class CarouselProduct extends Component {
  render () {
    return (
      <div style={box}>
       <CardImg top width="100%" src={Adirasa} alt="Card image cap" />
       <h4 className="text-info" style={box}>Platform Grosir Snack Online</h4>
       <p>Kami Menyediakan Snack Terbaik dan Dengan Pembelian Minimal <Badge color="info">Rp 100.000,- </Badge> Kamu Akan Terdaftar Sebagai <Badge color="info">MITRA</Badge> Produk Snack Kami</p>
      </div>
    )
  }
}


export default CarouselProduct;
