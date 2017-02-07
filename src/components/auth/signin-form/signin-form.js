import React, {Component} from 'react';
import CryptoJS from "crypto-js";
import {Row, Input, Button} from 'react-materialize';
import * as loginService from '../../../services/login-service';

export default class SigninForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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

        loginService
            .signin(data)
            .end((err, res) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    if (res.statusCode === 200) {
                        console.log('Signin');
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
                    <Input s={12} type="email" onChange={this.onChangeEmail} label="E-mail" />
                </Row>

                <Row>
                    <Input s={12} type="password" onChange={this.onChangePassword} label="Senha" />
                </Row>

                <Button type="submit" waves="light" className="w-100">
                    Faça parte!
                </Button>
            </form>
        )
    }
}