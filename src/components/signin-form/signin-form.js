import React, {Component} from 'react';
import CryptoJS from "crypto-js";
import * as loginService from '../../../service/login-service';

export default class SigninForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }

        this.submit = this
            .submit
            .bind(this);
    }

    submit(e) {
        e.preventDefault();
        
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
                <div className="row n-margin-bottom">
                    <div className="input-field col s12">
                        <input type="email" id="email" value={this.state.email}/>
                        <label htmlFor="email">E-mail</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input type="password" id="password" value={this.state.password}/>
                        <label htmlFor="password">Senha</label>
                    </div>
                </div>

                <button type="submit" className="waves-effect waves-light btn w-100">
                    Faça parte!
                </button>
            </form>
        )
    }
}