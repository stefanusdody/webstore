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
         <CardTitle className="text-info">Support</CardTitle>
         <p> Senin - Jumat : 10.00 - 17.00 </p>
         <p> <img src={require(`../assets/whatsapp.png`)} height="20px" alt="" /> : 081294086512 </p>
      </Col>
      <Col xs={12} sm={12} md={12} lg={4}>
         <br/>
         <CardTitle className="text-info">Toko Offline Retail Kami</CardTitle>
         <p className="text-info"> Mall Bassura City, Lantai 1 </p>
         <p>Jl. Basuki Rahmat No.1A, RT.8/RW.10, Cipinang Besar Sel., Jatinegara, Kota Jakarta Timur</p>
         <p className="text-info"> Cityplaza Jatinegara, Lantai 1  </p>
         <p>Jl. Matraman Raya No.173-175, RT.7/RW.6, Bali Mester, Jatinegara, Kota Jakarta Timur</p>
      </Col>
    </Row>
  </Container>
  </div>
  );
};

export default NavigationBottom ;
