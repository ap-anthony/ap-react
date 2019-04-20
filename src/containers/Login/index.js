import React from 'react';
import CheckBox from 'devextreme-react/check-box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';

import TextField from '@material-ui/core/TextField';

import styles from './login.css';

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

    componentDidMount() {
        document.body.classList.add('center-full-screen');
    }

    componentWillUnmount() {
        document.body.classList.remove('centered-full-screen');
    }

    onChange(event) {
        event.persist();
        const { name, value } = event.target;
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
            <form onSubmit={this.onSubmit} className={styles.loginForm}>
                <h2 className={styles.loginFormTitle}>Please log in</h2>
                <FormControl fullWidth required>
                    <TextField
                        autoFocus={true}
                        label="Enter your username"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                    />
                </FormControl>
                <FormControl fullWidth required margin="normal">
                    <TextField
                        label="Enter your password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <CheckBox
                        name="rememberMe"
                        text="Remember Me"
                        value={this.state.rememberMe}
                        onValueChanged={this.onRememberMeChange} />
                </FormControl>
                <FormControl margin="normal">
                    <Button
                        color="primary"
                        variant="contained"
                        disableRipple={true}
                        type="submit">
                        Log Me In!
                        <Icon>exit_to_app</Icon>
                    </Button>
                </FormControl>
            </form>
        );
    }
}