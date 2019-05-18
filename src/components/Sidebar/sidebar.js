import React from 'react';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: props.collapsed
        };
    }

    render() {
        return (
            <div className="sidebar">
                {Object.keys(this.props.menuLinks).map((currentKey) => {
                    return (
                        <div className="sidebar-link" key={currentKey}>
                            <span className="sidebar-link-text">{currentKey}</span>
                        </div>
                    );
                })}
            </div>
        );  
    }
}