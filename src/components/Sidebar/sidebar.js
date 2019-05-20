import React from 'react';
import styled from 'styled-components';
import { colors, assets, styles } from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SidebarDropdown from './sidebar-dropdown';

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
    overflow-y: auto;
`;

const SidebarLinksContainer = styled.div`
    padding: 0 15px;
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
    height: 34px;
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
                <SidebarLinksContainer>
                    {Object.keys(this.props.menuLinks).map((currentKey) => {
                        return (
                            <div key={currentKey}>
                                <SidebarLink onClick={() => this.clickSidebarLink(currentKey)}>
                                    <Icon>
                                        <FontAwesomeIcon icon={
                                            this.props.menuLinks[currentKey][0].icon ?  this.props.menuLinks[currentKey][0].icon.replace('fa-', '')
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
            </SidebarContainer>
        );  
    }
}