import React from 'react';
import styled from 'styled-components';
import { assets } from '../../theme';

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
    font-size: 18px;
`;

const SidebarDropdown = styled.ul`
    list-style-type: none;
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
`;

const SidebarHeaderTitle = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

function SidebarDropdownItem(props) {
    return (
        <li key={props.key}>{props.children}</li>
    );
}

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: props.collapsed
        };
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
                                <SidebarLink>{currentKey}</SidebarLink>
                                <SidebarDropdown>
                                    <SidebarDropdownItem>Example Link 1</SidebarDropdownItem>
                                    <SidebarDropdownItem>Example Link 2</SidebarDropdownItem>
                                    <SidebarDropdownItem>Example Link 3</SidebarDropdownItem>
                                </SidebarDropdown>
                            </div>
                        );
                    })}
                </SidebarLinksContainer>
            </SidebarContainer>
        );  
    }
}