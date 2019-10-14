import React, { Component } from 'react';
import './header.css';
import { BrowserRouter as Router } from 'react-router-dom';


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


