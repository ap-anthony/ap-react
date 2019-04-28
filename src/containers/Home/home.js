import React from 'react';
import TokenContext from '../../contexts/token';

import { Redirect } from 'react-router-dom';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TokenContext.Consumer>
                {value => {
                    if (value.token == null) {
                        return <Redirect to="/login" />;
                    } else {
                        return <h1>Hello, {value.loggedInUser.unique_name}. You are the APEX Champion!</h1>;
                    }
                }}
            </TokenContext.Consumer>
        );
    }
}

Home.contextType = TokenContext;