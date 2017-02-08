import React, {Component} from 'react';
import CryptoJS from "crypto-js";
import {Row, Input, Button} from 'react-materialize';
import * as loginService from '../../../services/auth-service';

export default class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        };

        this.submit = this.submit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
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

        loginService
            .signup(data)
            .end((err, res) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    if (res.statusCode === 200) {
                        console.log('Signup');
                        console.log(res.body);

                        // Salvar as informações do usuário no localStorage
                    } else {
                        //this.threatHttpErrors();
                    }
                }
            });
    }

    render() {
        return (
            <form onSubmit={this.submit} className="col s12">
                <Row className="n-margin-bottom">
                    <Input s={12} label="Nome" onChange={this.onChangeName} />
                </Row>

                <Row className="n-margin-bottom">
                    <Input s={12} type="email" label="E-mail" onChange={this.onChangeEmail} />
                </Row>

                <Row className="n-margin-bottom">
                    <Input s={12} type="password" label="Senha" onChange={this.onChangePassword} />
                </Row>

                <Button type="submit" waves="light" className="w-100">
                    Cadastrar
                </Button>
            </form>
        )
    }
}