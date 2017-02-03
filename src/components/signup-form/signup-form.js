import React, {Component} from 'react';
import CryptoJS from "crypto-js";
import * as loginService from '../../../service/login-service';

export default class SignupForm extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        
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
                <div className="row n-margin-bottom">
                    <div className="input-field col s12">
                        <input type="text" id="name" value={this.state.name}/>
                        <label for="name">Nome</label>
                    </div>
                </div>

                <div className="row n-margin-bottom">
                    <div className="input-field col s12">
                        <input type="email" id="email" value={this.state.email}/>
                        <label for="email">E-mail</label>
                    </div>
                </div>

                <div className="row n-margin-bottom">
                    <div className="input-field col s12">
                        <input type="password" id="password" value={this.state.password}/>
                        <label for="password">Senha</label>
                    </div>
                </div>

                <button type="submit" className="waves-effect waves-light btn w-100">
                    Cadastrar
                </button>
            </form>
        )
    }
}