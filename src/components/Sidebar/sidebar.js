import React from 'react';
import styled from 'styled-components';
import { colors, assets, styles } from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SidebarDropdown from './sidebar-dropdown';
import TokenContext from '../../contexts/token';

const Icon = styled.span`
    width: 23px;
    display: inline-block;
    margin: 0 5px 0 3px;
`;

const EndIcon = styled.span`
    position: absolute;
    right: 0;
`;

const SidebarContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const SidebarLinksContainer = styled.div`
    padding: 0 15px;
    flex: 1;
    overflow-y: auto;
`;

const SidebarLink = styled.button`
    width: 100%;
    text-align: left;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    color: white;
    font-size: 1em;
    padding: 5px;
    cursor: pointer;
    font-size: 16px;
    position: relative;
    min-height: 34px;
`;

const SidebarHeader = styled.div`
    height: 65px;
    width: 100%;
    display: flex;
`;

const SidebarHeaderLogo = styled.div`
    width: 95px;
    height: 100%;
    background-image: url(${assets.ap_logo_white});
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
`;

const SidebarHeaderTitle = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 18pt;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
    color: white;
`;

const SidebarProfile = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
`;

const ProfileImage = styled.div`
    width: 98px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const ProfileWelcome = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ProfileWelcomeGreeting = styled.div`
    color: white;
    font-size: 16px;
`;

const ProfileWelcomeName = styled.div`
    color: white;
    font-size: 20px;
`;

const SidebarDropdownItemLink = styled.button`
    width: 100%;
    color: ${colors.gray5};
    outline: none;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    height: 34px;
    padding-left: 31px;
    text-align: left;
    border-left: 1px solid ${colors.teal2};
    position: relative;
    text-shadow: ${styles.text_shadow_subtle};

    &::before {
        content: ' ';
        width: 7px;
        height: 7px;
        position: absolute;
        left: -4px;
        top: 13px;
        background-color: ${colors.teal3};
        border-radius: 50%;
    }
`;

const CircleImage = styled.div`
    width: 78px;
    height: 78px;
    background: url(${assets.user});
    border-radius: 50%;
    border: 4px solid white;
    background-position: center center;
    background-size: contain;
    margin: 0 auto;
`;

const SidebarFooter = styled.div`
    display: flex;
`;

const SidebarFooterButton = styled.div`
    flex: 1;
    background-color: ${colors.teal2};
    text-align: center;
    font-size: 18px;
    color: white;
    height: 34px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function SidebarDropdownItem(props) {
    return (
        <li>
            <SidebarDropdownItemLink data-tabid={props.tabId}>{props.children}</SidebarDropdownItemLink>
        </li>
    );
}

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: props.collapsed,
            menuLinksExpanded: {}
        };

        this.clickSidebarLink = this.clickSidebarLink.bind(this);
    }

    clickSidebarLink(clickedKey) {
        // Collapses all menus but expands the one that was clicked
        let menuLinksExpandedCopy = Object.keys(this.props.menuLinks).reduce((result, key) => {
            result[key] = key === clickedKey && !this.state.menuLinksExpanded[key];
            return result;
        }, {});
        this.setState({
            menuLinksExpanded: menuLinksExpandedCopy
        });
    }

    render() {
        return (
            <SidebarContainer>
                <SidebarHeader>
                    <SidebarHeaderLogo></SidebarHeaderLogo>
                    <SidebarHeaderTitle>AdmissionPros</SidebarHeaderTitle>
                </SidebarHeader>
                <SidebarProfile>
                    <ProfileImage>
                        <CircleImage />
                    </ProfileImage>
                    <ProfileWelcome>
                        <ProfileWelcomeGreeting>Welcome,</ProfileWelcomeGreeting>
                        <TokenContext.Consumer>
                            {({token}) => (
                                <ProfileWelcomeName>{token ? token.unique_name : ''}</ProfileWelcomeName>
                            )}
                        </TokenContext.Consumer>
                        <ProfileWelcomeName></ProfileWelcomeName>
                    </ProfileWelcome>
                </SidebarProfile>
                <SidebarLinksContainer>
                    {Object.keys(this.props.menuLinks).map((currentKey) => {
                        return (
                            <div key={currentKey}>
                                <SidebarLink onClick={() => this.clickSidebarLink(currentKey)}>
                                    <Icon>
                                        <FontAwesomeIcon icon={
                                            this.props.menuLinks[currentKey][0] ? this.props.menuLinks[currentKey][0].icon.replace('fa-', '')
                                                                                :  'info-circle'
                                        } />
                                    </Icon>
                                    {currentKey}
                                    <EndIcon>
                                        <FontAwesomeIcon icon="chevron-down" />
                                    </EndIcon>
                                </SidebarLink>
                                <SidebarDropdown expanded={this.state.menuLinksExpanded[currentKey]}>
                                    {this.props.menuLinks[currentKey].map((link => (
                                        <SidebarDropdownItem key={link.menu_id} tabId={link.id}>
                                            {link.caption}
                                        </SidebarDropdownItem>
                                    )))}
                                </SidebarDropdown>
                            </div>
                        );
                    })}
                </SidebarLinksContainer>
                <SidebarFooter>
                    <SidebarFooterButton>
                        <FontAwesomeIcon icon="info-circle" />
                    </SidebarFooterButton>
                    <SidebarFooterButton>
                        <FontAwesomeIcon icon="sync" />
                    </SidebarFooterButton>
                    <SidebarFooterButton>
                        <FontAwesomeIcon icon="lock" />
                    </SidebarFooterButton>
                    <SidebarFooterButton>
                        <FontAwesomeIcon icon="power-off" />
                    </SidebarFooterButton>
                </SidebarFooter>
            </SidebarContainer>
        );  
    }
}

Sidebar.defaultProps = {
    menuLinks: {}
};