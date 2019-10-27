import React, { Component } from 'react';
import {
  Button,
  Col,
  Navbar,
  NavbarBrand,
  Row,
  } from 'reactstrap';



class NavigationBarBottom extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
    <Navbar color="light fixed-bottom" light expand="md">
        <Row>
         <Col xs={6} sm={6} md={6} lg={6}>
            <NavbarBrand  href="/"><img src={require(`../assets/back.png`)} height="25px" alt="" /> </NavbarBrand>
         </Col>
        </Row>
    </Navbar>
    );
  }
}

export default NavigationBarBottom;
