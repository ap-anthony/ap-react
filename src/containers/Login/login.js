import React from 'react';
import CheckBox from 'devextreme-react/check-box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';

import TextField from '@material-ui/core/TextField';

import styles from './login.css';

import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import TokenContext from '../../contexts/token';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            rememberMe: false,
            redirectToHome: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onRememberMeChange = this.onRememberMeChange.bind(this);
    }

    componentDidMount() {
        document.body.classList.add('center-full-screen');
    }

    componentWillUnmount() {
        document.body.classList.remove('center-full-screen');
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
        event.event.preventDefault();

        console.log(process.env);

        const credentials = new URLSearchParams();
        credentials.append('grant_type', 'password');
        credentials.append('username', this.state.username);
        credentials.append('password', this.state.password);


        let request;

        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_API_KEY && process.env.REACT_APP_OFFLINE !== 'true') {
            // testing to mock server
            request = Axios.post(process.env.REACT_APP_API_URL + 'token', credentials, 
                {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY
                    }
                }
            );
        } else if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_OFFLINE === 'true') {
            console.log(process.env.REACT_APP_OFFLINE)
            request = new Promise((resolve) => {
                resolve({
                    data: {
                        unique_name: 'Jeffrey Hilts',
                        username: 'hiltsj',
                        personId: '2'
                    }
                });
            }) 
        } else {
            request = Axios.post(process.env.REACT_APP_API_URL + 'token', credentials);
        }
        request
            .catch(err => {
                console.error(err);
            })
            .then(response => {
                event.setToken(response.data)
                    .then((state) => {
                        this.setState({
                            redirectToHome: response && response.data
                        });
                    })
                    .catch((err) => {
                        // TODO: show an error message about the failure to read the token
                    });
            });
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/"></Redirect>;
        }

        return (
            <TokenContext.Consumer>
                {({ token, setToken }) => (
                    <form onSubmit={(event) => this.onSubmit({ event, setToken })} className={styles.loginForm}>
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
                )}
            </TokenContext.Consumer>
        );
    }
}