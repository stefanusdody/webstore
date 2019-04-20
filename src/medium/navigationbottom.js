import React from 'react';
import {
  Container,
  Row,
  Col,
  CardTitle,
  } from 'reactstrap';

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

const NavigationBottom = (props) => {
  return (
  <div style={box}>
   <Container>
    <Row>
      <Col xs={12} sm={12} md={12} lg={4}>
         <br/>
         <img src={require(`../assets/logo adirasa.png`)} height="90px" alt="" />
         <CardTitle>Adirasa Snack</CardTitle>
      </Col>
      <Col xs={12} sm={12} md={12} lg={4}>
         <br/>
         <CardTitle>Support</CardTitle>
         <p> Senin - Jumat : 10.00 - 17.00 </p>
         <p> <img src={require(`../assets/whatsapp.png`)} height="20px" alt="" /> : 081294086512 </p>
      </Col>
      <Col xs={12} sm={12} md={12} lg={4}>
         <br/>
         <CardTitle>Toko Offline Retail Kami</CardTitle>
         <p> Mall Bassura City ( Lantai 1 )</p>
         <p> Cityplaza Jatinegara ( Lantai 1 ) </p>
      </Col>
    </Row>
  </Container>
  </div>
  );
};

export default NavigationBottom ;
