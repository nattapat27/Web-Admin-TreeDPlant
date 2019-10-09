import React, { Component } from 'react';
import './header.css';
import logo from './logo-green.png';
import user from './man-user.png';
import { Button } from 'react-bootstrap';
//import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
//import Login from './Login';


class Header extends Component {


  render() {
    return (
      <Router>

        <div className="header">
          <p className="tree">Tree-D Plants</p>
          <a href="/order"><p> จัดการคำสั่งซื้อ </p></a>
          <a href="/product"><p> เพิ่ม-ลดสินค้า </p></a>
        </div>

      </Router>
    );
  }

}
export default Header;


