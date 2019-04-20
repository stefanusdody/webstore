import React, { Component } from 'react';
import { Card,
         Container,
         CardImg,
         } from 'reactstrap';

import Adirasa from "../assets/Adirasa copy1.png";

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

class CarouselProduct extends Component {
  render () {
    return (
      <Container style={box}>
      <Card>
        <CardImg top width="100%" src={Adirasa} alt="Card image cap" />
      </Card>
       <br/>
       <h2> Pilih Snack Favorite Kamu </h2>
       <p>Kami Menyediakan Snack Terbaik dan Akan Mengirimkan Langsung ke Kamu, Sehingga Kamu Bisa Fokuskan ke Hal Yang Lebih Penting</p>
     </Container>
    )
  }
}


export default CarouselProduct;
