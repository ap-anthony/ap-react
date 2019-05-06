import React from 'react';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            menuLinks: props.menuLinks || [],
            collapsed: props.collapsed
        };
    }

    render() {
        return (
            <div className="sidebar">
                {Object.keys(this.state.menuLinks).map((currentKey) => {
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