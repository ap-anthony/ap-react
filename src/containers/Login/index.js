import React from 'react';
import ApTextField from '../../components/ApTextField/ap-text-field';
import Button from 'devextreme-react/button';
import CheckBox from 'devextreme-react/check-box';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            rememberMe: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onRememberMeChange = this.onRememberMeChange.bind(this);
    }

    onChange(event) {
        const { name, value } = event.event.target;
        this.setState({
            [name]: value
        });
    }

    onRememberMeChange(event) {
        this.setState({
            rememberMe: event.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <ApTextField
                    name="username"
                    value={this.state.username} 
                    placeholder="Enter your username"
                    caption="Username"
                     />
                <ApTextField
                    name="password"
                    value={this.state.password}
                    placeholder="Enter your password"
                    mode="password"
                    caption="Password" />
                <CheckBox 
                    name="rememberMe"
                    text="Remember Me"
                    value={this.state.rememberMe}
                    onValueChanged={this.onRememberMeChange} />
                <Button 
                    text="Submit"
                    useSubmitBehavior={true} />
            </form>
        );
    }
}