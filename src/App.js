import React, { Component } from 'react';
import './App.css';
import Login from './containers/Login/login';
import Helmet from 'react-helmet';
import Home from './containers/Home/home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TokenContext from './contexts/token';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';
import TokenService from './services/token-service';

var jwtDecode = require('jwt-decode');

class App extends Component {

    constructor(props) {
        super(props);

        this.setToken = (token) => {
            let promise = new Promise((resolve, reject) => {
                try {
                    this.setState((prev) => {
                        if (process.env.REACT_APP_OFFLINE === 'true') {
                            prev.token = token;
                        } else {
                            prev.token = jwtDecode(token.access_token);
                        }
                        this.state.tokenService.setToken(token.access_token);
                        resolve(prev);
                    });
                } catch (err) {
                    this.setState((prev) => {
                        prev.token = null;
                        reject(err);
                    });
                }
            });
            return promise;
        };

        const tokenService = new TokenService();

        if (tokenService.hasExpired()) {
            tokenService.removeToken();
        }
        
        let token = null;
        if (tokenService.hasToken()) {
            token = tokenService.getDecodedToken();
        }

        this.state = {
            token,
            tokenService,
            setToken: this.setToken.bind(this),
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
