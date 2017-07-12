import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

import './App.css';

//Containers
import Login from './component/login/login.component';
import Friends from './component/friends/friends.component';

class App extends Component {
    constructor() {
        super();
        this.state = {};
    }

  render() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" render={() => (
                    (localStorage.getItem('token') && localStorage.getItem('token')!=='') ? (
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

export default App;
