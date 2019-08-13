import React, { Component } from 'react';
import './header.css';
import logo from './logo-green.png';
import user from './man-user.png';
import { Button} from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Header extends Component{
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
    render(){
        return(
            <div className = "header">
            <img src={logo} className="logo" alt="logo" />
            <div className="manage">
              <Button className="addProduct">เพิ่มลดสินค้า</Button>
              <Button className="order">จัดการคำสั่งซื้อ</Button>

          </div>
            
            <img src={user} className="user" alt="user"/>
               
            </div>
            );
    }

  }
export default Header;

