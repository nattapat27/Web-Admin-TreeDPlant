import React, { Component } from 'react';
import './header.css';
import logo from './logo-green.png';
import user from './man-user.png';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import AddTree from './Product';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: []
    }
  }

  async componentDidMount() {
    await axios.get('https://treedp.doge.in.th/admin/login')
      .then(response => {
        this.setState({
          user: response.data
        })
      })
  }
  
  render() {
    return (
      <Router>
        <div className="header">
          <img src={logo} className="logo" alt="logo" />
          <div className="manage">
          <a href="/product"><Button className="addProduct">เพิ่ม-ลดสินค้า</Button></a>
          <a href="/order"><Button className="order">จัดการคำสั่งซื้อ</Button></a>
          </div>

          <img src={user} className="user" alt="user" />
          
        </div>

        <Route exact path="/addTree" component={AddTree}></Route>


        </Router>
    );
  }

}
export default Header;


