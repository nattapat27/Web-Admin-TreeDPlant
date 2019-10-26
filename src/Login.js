import React, { Component } from 'react';
import logo from './logo-white.png';
import './Login.css'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Product from './Product';




class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            login:false
        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        //console.log(e.target.value);
    }

    submitLogin = e => {
        e.preventDefault()
        //console.log(this.state)
        const apiURL = 'https://treedp.doge.in.th/admin/login'
        axios.post(apiURL, this.state)
            .then(response => {
                if (response.data.email != null) {
                    this.setState({login:true})
                    //console.log(response.data)
                    this.props.history.push('/product')
                } else if((response.data.email = null)){
                    alert("Incorrect Email or Password")
                }else if(this.state.login===false){
                    this.props.history.push('/')
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
                    <input type="text"
                        className="email"
                        name="email"
                        placeholder="Enter your e-mail"
                        value={email}
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
                    onClick={this.submitLogin}> Submit </Button>
            </div>
        );
    }
}
export default Login;


