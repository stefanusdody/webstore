import React, { Component } from 'react';
import { Card,
         Container,
         CardImg,
         } from 'reactstrap';


import Adirasa from "../assets/Adirasa copy1.png";

class CarouselProduct extends Component {
  render () {
    return (
      <Container className="box">
      <Card>
        <CardImg top width="100%" src={Adirasa} alt="Card image cap" />
      </Card>
       <br/>
       <h2> Pilih Snack Favorite Kamu </h2>
       <p>Kamu Tidak Perlu Repot Karena Kami Menyediakan Snack Terbaik dan Akan Mengirimkan Langsung ke Kamu, Sehingga Kamu Bisa Fokuskan ke Hal Yang Lebih Penting</p>
     </Container>
    )
  }
}


export default CarouselProduct;
