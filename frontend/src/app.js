import './app.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

//Containers
import Login from './component/login/login';
import Friends from './component/friends/friends';

export default class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" render={() => (
                        (localStorage.getItem('token') && localStorage.getItem('token') !== '') ? (
                            <Redirect to="/friends"/>
                        ) : (
                            <Login/>
                        )
                    )}/>
                    <Route path="/friends" component={Friends}/>
                </div>
            </Router>
        );
    }
}

