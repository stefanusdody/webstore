import React, { Component } from 'react';
import { Card,
         Container,
         CardImg,
         CardTitle
         } from 'reactstrap';

import Adirasa from "../assets/head.png";

const box = {
  marginTop: "20px",
  marginBottom: "25px",
  position: "relative",
  fontFamily: 'Merriweather',
  fontFamily: "serif",
  fontFamily: "Open Sans Condensed",
  fontFamily: "sans-serif",
  textAlign: "center"
}
const titleBox = {
  marginTop: "20px",
}

class CarouselProduct extends Component {
  render () {
    return (
      <Container style={box}>
        <CardImg top width="100%" src={Adirasa} alt="Card image cap" />

       <CardTitle style={titleBox}> Pilih Snack Favorite Kamu </CardTitle>
       <p>Kami Menyediakan Snack Terbaik dan Akan Mengirimkan Langsung ke Kamu, Sehingga Kamu Bisa Fokuskan ke Hal Yang Lebih Penting</p>
      </Container>
    )
  }
}


export default CarouselProduct;
