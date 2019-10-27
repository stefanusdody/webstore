import React from 'react';
import {
  Container,
  Row,
  Col,
  CardTitle,
  NavLink
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
         <CardTitle className="text-info">Support</CardTitle>
         <p> Senin - Jumat : 10.00 - 17.00 </p>
         <p> <img src={require(`../assets/whatsapp.png`)} height="20px" alt="" /> : 081294086512 </p>
         <CardTitle className="text-info">Temukan kami di</CardTitle>
          <Row>
          <Col xs={3} sm={3} md={3} lg={3}>

          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <NavLink href="https://business.facebook.com/AdirasaSnack/"><img  src={require(`../assets/facebook.png`)} height="50px" alt="" /></NavLink>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <NavLink href="https://www.instagram.com/adirasa_snack/"><img src={require(`../assets/instagram.png`)} height="50px" alt="" /></NavLink>
          </Col>



          </Row>
      </Col>

    </Row>
  </Container>
  </div>
  );
};

export default NavigationBottom ;
