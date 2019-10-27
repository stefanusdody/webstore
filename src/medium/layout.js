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


class Layout extends Component {
  render () {
    return (
      <Container style={box}>
       <CardImg top width="100%" src={Adirasa} alt="Card image cap" />
       
      </Container>
    )
  }
}


export default Layout;
