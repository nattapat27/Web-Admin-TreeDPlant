import React, { Component } from 'react';
import logo from './logo-white.png';
import './Login.css'
import { Button} from 'react-bootstrap';

class Login extends Component {
    render() {
        return (
            <div className="bg">
                <img src={logo} className="logo" alt="logo" />
                <br></br><br></br>
                <form>
                    <input type="text" className="email" name="email" placeholder="Enter your e-mail" />
                    <br></br>
                    <input type="text" className="password" name="password" placeholder="Enter your password" />
                </form>
                <br></br>
                <Button className="submit">เข้าสู่ระบบ</Button>

                
               
                

            </div>
        )
    }
}
export default Login;