import React, { Component } from 'react';
import apiService from '../../service/api.service'
import './login.component.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: ''
        };
    }

    handleChange(event) {
        const events = event.target;
        const name = events.name;
        this.setState({ [name]: events.value });
    }

    render() {
        return (
            <div className="content">
                <div className = "modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="loginmodal-container">
                            <h1>Login to Your Account</h1><br/>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" name="user" id="user" placeholder="Email" onChange={this.handleChange.bind(this)}/>
                                <input type="password" name="pass" id="pass" placeholder="Password" onChange={this.handleChange.bind(this)}/>
                                <input type="submit" onClick={this.loginUser.bind(this)} name="login" className="login loginmodal-submit" value="Login" />
                            </form>
                            <div className="login-help">
                                <a href="">Register</a> - <a href="">Forgot Password</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    loginUser(){
        let data = {
            email: this.state.user,
            password: this.state.pass
        };
        apiService.login(data, (token)=>{
            console.log(token);
            localStorage.setItem('token', token);
            window.location.pathname = '/friends'
        });

    }
}

export default Login;
