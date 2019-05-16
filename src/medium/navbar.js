import React, { Component } from 'react';
import {
  Col,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  } from 'reactstrap';

const navBar = {
 marginTop: "100px",
 display: "flex"
}

const textBox = {
  fontSize: "30px",
  fontColor: "17a2b8"
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
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
