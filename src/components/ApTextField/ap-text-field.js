import React from 'react';
import TextBox from 'devextreme-react/text-box';

export default class ApTextField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.event.target.value
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
        )
    }
}