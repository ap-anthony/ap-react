import React, { Component } from 'react';
import './App.css';
import Login from './containers/Login/login';
import Helmet from 'react-helmet';
import Home from './containers/Home/home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TokenContext from './contexts/token';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';

var jwtDecode = require('jwt-decode');

class App extends Component {

    constructor(props) {
        super(props);

        this.setToken = (token) => {
            let promise = new Promise((resolve, reject) => {
                try {
                    this.setState((prev) => {
                        prev.token = token.access_token;
                        prev.loggedInUser = jwtDecode(token.access_token);
                        resolve(prev);
                    });
                } catch (err) {
                    this.setState((prev) => {
                        prev.token = null;
                        prev.loggedInUser = null;
                        reject(err);
                    });
                }
            });
            return promise;
        };

        this.state = {
            token: null,
            setToken: this.setToken.bind(this),
            loggedInUser: null
        };
    }
    render() {
        return (
            <div className="App">
                <Helmet>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                </Helmet>

                <Router>

                    <TokenContext.Provider value={this.state}>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/login" component={Login}></Route>
                    </TokenContext.Provider>

                </Router>
            </div>
        );
    }
}

export default App;
