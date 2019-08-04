import React, { Component } from 'react';
import './header.css';
import logo from './logo-green.png';
import user from './man-user.png';
import { Button} from 'react-bootstrap';
//import axios from 'axios';

class Header extends Component{
    render(){
        return(
            <div className = "header">
            <img src={logo} className="logo" alt="logo" />
            <Button className="addTree">Add Trees</Button>
            <Button className="order">Order</Button>
            <img src={user} className="user" alt="user"/>
            </div>
            )
    }

}
export default Header;
