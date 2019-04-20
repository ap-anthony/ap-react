import React, { Component } from 'react';
import './App.css';
import Login from './containers/Login/index';
import Helmet from 'react-helmet';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Helmet>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                </Helmet>
                <Login />
            </div>
        );
    }
}

export default App;
