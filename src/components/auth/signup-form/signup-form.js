import React, {Component} from 'react';
import {Row, Input, Button, Preloader} from 'react-materialize';
import {browserHistory} from 'react-router';
import CryptoJS from "crypto-js";
import * as loginService from '../../../services/auth-service';
import * as userInformationStore from '../../../utils/user-information-store';

export default class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            loading: false
        };
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    onChangePassword(event) {
        this.setState({password: event.target.value});
    }

    submit(event) {
        event.preventDefault();

        console.log('Registro enviado com sucesso');
        console.log(this.state);

        const data = {
            name: this.state.name,
            email: this.state.email,
            password: CryptoJS.MD5(this.state.password).toString(),
            device_type: 'web',
            device_token: ''
        };

        this.signup(data);
    }

    signup(data) {
        console.log('Signup');
        console.log(data);

        this.setState({loading: true});
        loginService.signup(data)
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
            <form onSubmit={this.submit.bind(this)} className="col s12">
                <Row className="n-margin-bottom">
                    <Input s={12} label="Nome" onChange={this.onChangeName.bind(this)}/>
                </Row>

                <Row className="n-margin-bottom">
                    <Input s={12} type="email" label="E-mail"
                           onChange={this.onChangeEmail.bind(this)}/>
                </Row>

                <Row className="n-margin-bottom">
                    <Input s={12} type="password" label="Senha"
                           onChange={this.onChangePassword.bind(this)}/>
                </Row>

                <Button type="submit" waves="light" className="w-100">
                    {
                        this.state.loading ? (<Preloader size="small" color="yellow"/>) : (<div>Cadastrar</div>)
                    }
                </Button>
            </form>
        )
    }
}