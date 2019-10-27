import React, { Component } from 'react';
import {
         CardImg,
         CardText,
         Container,
         Row,
         Col
         } from 'reactstrap';

import Adirasa from "../assets/head.png";

const box = {
  paddingRight: "10px",
  paddingLeft: "10px",
  marginTop: "70px",
  marginBottom: "25px",
  position: "relative",
  fontFamily: "sans-serif",
  textAlign: "center",
}

const textBox = {
  color: "rgb(110, 118, 121)",
  fontSize: "15px",

}


class CarouselProduct extends Component {
  render () {
    return (
      <Container style={box}>
       <CardImg top width="100%" src={Adirasa} alt="Card image cap" />
       <h4 className="text-info" style={box}>Nikmati Snack Favorite Kamu Kapan Saja</h4>
       <Row>
         <Col xs={4} sm={4} md={4} lg={4}>
            <CardImg  width="100%" src={require(`../assets/meeting.png`)}  alt="Card image cap" />
         </Col>
         <Col xs={4} sm={4} md={4} lg={4}>
            <CardImg  width="100%" src={require(`../assets/Santai.png`)}  alt="Card image cap" />
         </Col>
         <Col xs={4} sm={4} md={4} lg={4}>
            <CardImg  width="100%" src={require(`../assets/liburan.png`)}  alt="Card image cap" />
         </Col>
       </Row>
       <br/>
       <CardText style={textBox}>Kini Pesan Snack Favorite Jadi Lebih Mudah, Kamu Tinggal Pilih Snack Favorite Dan Fokuskan Waktu Kamu ke Hal Yang Lebih Penting </CardText>
      </Container>
    )
  }
}


export default CarouselProduct;
