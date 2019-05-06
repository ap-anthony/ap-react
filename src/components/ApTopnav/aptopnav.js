import React from 'react';
import TokenContext from '../../contexts/token';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import styles from './aptopnav.css';

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
            <div className='ap-topnav flex-r'>
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
                        { value => {
                            console.log(value);
                            return (
                                <div className="user-info">
                                    {value.loggedInUser.unique_name}
                                </div>
                            );
                        }}
                    </TokenContext.Consumer>
                </div>
            </div>
        );
    }

}