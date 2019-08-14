import React, { Component } from 'react';
import logo from './logo-white.png';
import './Login.css'
import { Button } from 'react-bootstrap';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.value);
    }
    submitLogin = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('https://treedp.doge.in.th/admin/login', this.state)
            .then(response => {
                console.log(response.data)
            })
            .catch(error=>{
                console.log(error.response.data)
            })
         


    }
    render() {
        const { email, password } = this.state
        return (
            <div className="bg">
                <img src={logo} className="logoLogin" alt="logo" />
                <br></br><br></br>
                <form >
                    <input type="text" className="email" name="email"
                        placeholder="Enter your e-mail" value={email}
                        onChange={this.changeHandler}
                    />
                    <br></br>
                    <input type="password"
                        className="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={this.changeHandler}
                    />
                </form>
                <br></br>
                <Button className="submitLogin" onClick={this.submitLogin} >Submit</Button>
            </div>
        );
    }
}
export default Login;


