import './login.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {login} from '../../actions/auth'
import _ from 'lodash';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: ''
        };
    }

    componentDidUpdate() {
        if(this.props.tokenData) {
            localStorage.setItem('token', this.props.tokenData.token);
            window.location.pathname = '/friends';
        }
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

    handleChange(event) {
        const events = event.target;
        const name = events.name;
        this.setState({ [name]: events.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    loginUser() {
        console.log('login');
        this.props.doLogin({email: this.state.user, password: this.state.pass});

    }
}

const mapStateToProps = (state) => {
    return {
        tokenData: _.get(state, 'auth.login.data', ''),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (payload) => dispatch(login(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login)