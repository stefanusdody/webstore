import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  } from 'reactstrap';

import "../App.css"

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
      <div className="navBar">
        <Navbar color="light fixed-top" light expand="md">
          <NavbarBrand  href="/"><img src={require(`../assets/logo adirasa.png`)} height="90px" alt="" /> AdirasaSnack </NavbarBrand>
          <Nav className="ml-auto" navbar>

          </Nav>

        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
