import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
    width: 100%;
    height: 100%;
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
`;

const SidebarDropdown = styled.ul`
    list-style-type: none;
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
            </SidebarContainer>
        );  
    }
}