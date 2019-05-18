import React from 'react';
import TokenContext from '../../contexts/token';

import { Redirect } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/sidebar';
import ApTopnav from '../../components/ApTopnav/aptopnav';
import Axios from 'axios';

import TokenService from '../../services/token-service';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // This will come from an API call at some point
            menuLinks:{ },
            collapsed: false
        }

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(value) {
        this.setState({
            collapsed: value
        });
    }

    componentDidMount() {
        const tokenService = new TokenService();
        Axios.get(process.env.REACT_APP_API_URL + 'api/util/GetMainMenuList', {
            headers: {
                'Authorization': `Bearer ${tokenService.getRawToken()}`
            }
        }).then(({data}) => {
            this.setState({
                menuLinks: data
            });
        })
    }

    renderMain(token) {
        return (
            <div className={"flex-r " + (this.state.collapsed ? 'collapsed' : '')}>
                <Sidebar menuLinks={this.state.menuLinks} collapsed={this.state.collapsed}></Sidebar>
                <ApTopnav onCollapseToggle={this.handleToggle} collapsed={this.state.collapsed}></ApTopnav>
            </div>
        );  
    }

    render() {
        return (
            <TokenContext.Consumer>
                {({ tokenService }) => {
                    if (tokenService.validToken()) {
                        return this.renderMain(tokenService.getDecodedToken());
                    } else {
                        return <Redirect to="login" />
                    }
                }}
            </TokenContext.Consumer>
        );
    }
}

Home.contextType = TokenContext;