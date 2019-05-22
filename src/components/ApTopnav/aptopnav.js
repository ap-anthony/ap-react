import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import styled from 'styled-components';
import { assets, colors } from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '@fortawesome/fontawesome-free/css/all.min.css';

const TopNavContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    background-image: url(${assets.DIAGONAL_LINES_TEX});
    padding: 0 4px;
    transition: transform 0.25s;
`;

const TopNavLeft = styled.div`
    width: auto;
`;

const TopNavCenter = styled.div`
    flex: 1;
`;

const TopNavRight = styled.div`
    width: auto;
`;

function TopNavButton(props) {
    let { icon, ...otherProps } = props;

    if (!icon) {
        icon = 'info-circle';
    }

    const TopNavButtonWrapper = styled.div`
        width: 65px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 24px;
        display: inline-block;
    `;

    const TopNavButtonIcon = styled.span`
        text-shadow: 0 0 16px #fff, 0 0 0 #000, 1px 4px 6px transparent;
        color: transparent;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        border-left: ${props.borderLeft ? props.borderLeft : '2px solid #e0e0e0' };
        border-right: ${props.borderRight ? props.borderRight : 'none' };
    `;

    return (
        <TopNavButtonWrapper onClick={otherProps.onClick}>
            <TopNavButtonIcon>
                <i className={'fas ' + icon}></i>
            </TopNavButtonIcon>
        </TopNavButtonWrapper>
    );
}

export default class ApTopnav extends React.Component {
    
    constructor(props) {
        super(props);

        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse(e) {
        this.props.onCollapseToggle(!this.props.collapsed);
    }

    onAlertsClick() {

    }

    render() {
        return (
            <TopNavContainer>
                <TopNavLeft>
                    <TopNavButton 
                        onClick={this.toggleCollapse} 
                        icon="fa-bars"
                        borderLeft={false} />
                </TopNavLeft>
                <TopNavCenter></TopNavCenter>
                <TopNavRight>
                    <TopNavButton onClick={this.onAlertsClick} icon="fa-search" />
                    <TopNavButton onClick={this.onAlertsClick} icon="fa-bullhorn" />
                    <TopNavButton onClick={this.onAlertsClick} icon="fa-bookmark" />
                    <TopNavButton onClick={this.onAlertsClick} icon="fa-glasses" />
                    <TopNavButton onClick={this.onAlertsClick} icon="fa-bell" />
                </TopNavRight>
            </TopNavContainer>
        );
    }

}