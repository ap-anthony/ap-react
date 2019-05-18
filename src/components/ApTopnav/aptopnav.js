import React from 'react';
import TokenContext from '../../contexts/token';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import styles from './aptopnav.css';
import styled from 'styled-components';
import { assets } from '../../theme';

const TopNavContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    background-image: url(${assets.DIAGONAL_LINES_TEX});
    padding: 4px;
    transition: transform 0.25s;
`;

export default class ApTopnav extends React.Component {
    
    constructor(props) {
        super(props);

        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse(e) {
        this.props.onCollapseToggle(!this.props.collapsed);
    }

    render() {
        return (
            <TopNavContainer>
                <div className={styles.contentLeft}>
                    <div className="menuToggle">
                        <IconButton aria-label="Toggle Menu" onClick={this.toggleCollapse}>
                            <Icon>menu</Icon>
                        </IconButton>
                    </div>
                </div>
                <div className={styles.contentCenter}></div>
                <div className={styles.contentRight}>
                    <TokenContext.Consumer>
                        { ({token}) => {
                            return (
                                <div className="user-info">
                                    {token.unique_name}
                                </div>
                            );
                        }}
                    </TokenContext.Consumer>
                </div>
            </TopNavContainer>
        );
    }

}