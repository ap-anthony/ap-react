import React from 'react';
import TextBox from 'devextreme-react/text-box';

import PropTypes from 'prop-types';

export default class ApTextField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { value } = event.event.target;
        this.setState({ value });
        this.props.onValueChanged({
            event,
            value
        });
    }

    render() {
        return (
            <div className="field-group">
                <label>
                    <span className="label">{this.props.caption}</span>
                    <TextBox
                        name={this.props.name}
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange}
                    />
                </label>
            </div>
        );
    }
}

ApTextField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    caption: PropTypes.string,
    onValueChanged: PropTypes.func
};

ApTextField.defaultProps = {
    onValueChanged: (event) => { }
};