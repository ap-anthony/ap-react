import React from 'react';
import TokenContext from '../../contexts/token';

import { Redirect } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/sidebar';
import ApTopnav from '../../components/ApTopnav/aptopnav';
import Axios from 'axios';

import TokenService from '../../services/token-service';

import styled from 'styled-components';
import { colors, assets } from '../../theme';

const HomeContainer = styled.div`
    width: 100%;
    height: ${window.innerHeight}px;
    display: flex;
    overflow-x: hidden;
    overflow-y: hidden;
`;

const LeftSide = styled.div`
    width: 283px;
    background-color: ${colors.teal1};
    background-image: url(${assets.DIAGONAL_LINES_TEX});
    overflow-y: hidden;
    overflow-x: hidden;
`;

const RightSide = styled.div`
    flex: 1;

    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 65px auto;
    overflow: hidden hidden;
`;

const HomeContentContainer = styled.div`
    background-color: white;
    overflow-y: auto;
`;

function HomeContent(props) {
    return (
        <div style={{ height: '2880px' }}>
            <h1>Here's some example content for the content section!</h1>        
        </div>
    );
}

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
        document.getElementsByClassName('ap-logo-overlay')[0].style.zIndex = -1;

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

    componentWillUnmount() {
        document.getElementsByClassName('ap-logo-overlay')[0].style.zIndex = 0;
    }

    renderMain(token) {
        return (
            <HomeContainer>
                <LeftSide>
                    <Sidebar menuLinks={this.state.menuLinks} collapsed={this.state.collapsed}></Sidebar>
                </LeftSide>
                <RightSide>
                    <ApTopnav onCollapseToggle={this.handleToggle} collapsed={this.state.collapsed}></ApTopnav>
                    <HomeContentContainer>
                        <HomeContent />
                    </HomeContentContainer>
                </RightSide>
            </HomeContainer>
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