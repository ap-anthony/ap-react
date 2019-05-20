import React from 'react';
import styled from 'styled-components';


export default class SidebarDropdown extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const SidebarDropdownList = styled.ul`
            list-style-type: none;
            margin: 0;
            padding: 0 0 0 15px;
            display: ${this.props.expanded ? 'block' : 'none'};
        `;
        return (
            <SidebarDropdownList>{this.props.children}</SidebarDropdownList>
        );
    }

}