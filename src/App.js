import React, { Component } from 'react';
import './App.css';
import Login from './containers/Login/index';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Login />
            </div>
        );
    }
}

export default App;
