import React, { Component } from 'react';
import './header.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, NavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer }
from 'mdbreact';

class Header extends Component {
  constructor() {
    super()
    this.state = {
      collapseID: ''
    }

  }

  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
  }

  render() {
    return (
      <Router>

        <div className="header">
          <p className="tree">Tree-D Plants</p>
          <a href="/order"><p> จัดการคำสั่งซื้อ </p></a>
          <a href="/product"><p> เพิ่ม-ลดสินค้า </p></a>
        </div>

        <MDBContainer className="hamburger">
        <MDBNavbar color="light-blue lighten-4" style={{ marginTop: '10px' }} light>
          <MDBContainer>
            <MDBNavbarBrand>
              Tree-d Plant
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse('navbarCollapse1')} />
            <MDBCollapse id="navbarCollapse1" isOpen={this.state.collapseID} navbar>
              <NavbarNav left>
                <MDBNavItem active>
                  <a href="/product"><p> เพิ่ม-ลดสินค้า </p></a>
                </MDBNavItem>
                <MDBNavItem>
                  <a href="/order"><p> จัดการคำสั่งซื้อ </p></a>
                </MDBNavItem>
              </NavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </MDBContainer>

      </Router>
    );
  }

}
export default Header;


