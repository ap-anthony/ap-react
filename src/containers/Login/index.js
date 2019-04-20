import React from 'react';
import ApTextField from '../../components/ApTextField/ap-text-field';
import CheckBox from 'devextreme-react/check-box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

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
        const name = event.target.name;
        const value = event.value;
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
                    onValueChanged={this.onChange} />
                <ApTextField
                    name="password"
                    value={this.state.password}
                    placeholder="Enter your password"
                    mode="password"
                    caption="Password"
                    onValueChanged={this.onChange} />
                <CheckBox 
                    name="rememberMe"
                    text="Remember Me"
                    value={this.state.rememberMe}
                    onValueChanged={this.onRememberMeChange} />
                <Button 
                    color="primary" 
                    variant="container" 
                    disableRipple={true}
                    type="submit">
                    Log Me In!
                    <Icon>exit_to_app</Icon>
                </Button>
            </form>
        );
    }
}