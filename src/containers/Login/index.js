import React from 'react';
import ApTextField from '../../components/ApTextField/ap-text-field';
import Button from 'devextreme-react/button';

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
    }

    onChange(event) {
        this.setState({
            [name]: event.event.target.value
        });
    }

    onSubmit() {
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <ApTextField
                    name="username"
                    value={this.state.username} 
                    placeholder="Enter your username"
                    caption="Username" />
                <ApTextField
                    name="password"
                    value={this.state.password}
                    placeholder="Enter your password"
                    caption="Password" />
                <Button 
                    text="Submit"
                    useSubmitBehavior={true} />
            </form>
        );
    }
}