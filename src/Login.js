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
        //console.log(e.target.value);
    }

    submitLogin = e => {
        e.preventDefault()
        console.log(this.state)
        const apiURL = 'https://treedp.doge.in.th/admin/login'
        // const apiURL = 'http://localhost:8080/admin/login'
        axios.post(apiURL, this.state)
            .then(response => {
                if (response != null) {
                    console.log(response)
                    this.props.history.push('/product')
                } 

            })
            .catch(error => {

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
                <Button className="submitLogin"
                    onClick={this.submitLogin} >Submit</Button>
            </div>
        );
    }
}
export default Login;


