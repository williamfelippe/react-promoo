import React, {Component} from 'react';
import {Row, Input, Button, Preloader} from 'react-materialize';
import {browserHistory} from 'react-router';
import CryptoJS from "crypto-js";
import * as loginService from '../../../services/auth-service';
import * as userInformationStore from '../../../utils/user-information-store';

export default class SigninForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false
        };

        this.submit = this.submit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    onChangePassword(event) {
        this.setState({password: event.target.value});
    }

    submit(event) {
        event.preventDefault();

        console.log('Login realizado com sucesso');
        console.log(this.state);

        const data = {
            email: this.state.email,
            password: CryptoJS.MD5(this.state.password).toString(),
            device_type: 'web',
            device_token: ''
        };

        this.signin(data);
    }

    signin(data) {
        console.log('Signin');
        console.log(data);

        this.setState({loading: true});
        loginService.signin(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    const userInformations = response.data;

                    const token = userInformations.token;
                    const user = userInformations.user;

                    userInformationStore.createUserStore(user._id, user.name, user.email, user.photo, token, user.settings);
                    browserHistory.push('/');
                }

                this.setState({loading: false});
            })
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <form onSubmit={this.submit} className="col s12">
                <Row className="n-margin-bottom">
                    <Input s={12} type="email" onChange={this.onChangeEmail}
                           label="E-mail" />
                </Row>

                <Row>
                    <Input s={12} type="password" onChange={this.onChangePassword}
                           label="Senha" />
                </Row>

                <Button type="submit" waves="light" className="w-100 center-align">
                    {
                        this.state.loading ? (<Preloader size="small" color="yellow"/>) : (<div>Faça parte!</div>)
                    }
                </Button>
            </form>
        )
    }
}