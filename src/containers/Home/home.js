import React from 'react';
import TokenContext from '../../contexts/token';

import { Redirect } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/sidebar';
import ApTopnav from '../../components/ApTopnav/aptopnav';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // This will come from an API call at some point
            menuLinks:{
                "My Information": [
                    {
                        "menu_id": 138,
                        "caption": "My Applicant Watch List",
                        "id": "my-applicant-watch-list",
                        "icon": null
                    },
                    {
                        "menu_id": 137,
                        "caption": "Edit Profile Information",
                        "id": "edit-profile-information",
                        "icon": null
                    }
                ]
            },
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
                {value => {
                    if (value.token == null) {
                        return <Redirect to="/login" />;
                    } else {
                        return this.renderMain(value.token);
                    }
                }}
            </TokenContext.Consumer>
        );
    }
}

Home.contextType = TokenContext;