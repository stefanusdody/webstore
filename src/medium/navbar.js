import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  } from 'reactstrap';

const navBar = {
 marginTop: "100px",
 display: "flex"
}

class NavigationBar extends Component {
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
      <div style={navBar}>
        <Navbar color="light fixed-top" light expand="md">
          <NavbarBrand  href="/"><img src={require(`../assets/logo adirasa.png`)} height="60px" alt="" /> AdirasaSnack </NavbarBrand>
          <Nav className="ml-auto" navbar>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
