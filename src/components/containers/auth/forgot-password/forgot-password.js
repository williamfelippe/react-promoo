import React, {Component} from 'react';
import {Link} from 'react-router';
import ForgotPasswordForm from '../../../partials/forgot-password-form/forgot-password-form';
import logo from '../../../../../public/images/logo.png';

export default class ForgotPassword extends Component {
    render() {
        return (
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col s8 offset-s2 h-100">
                        <div className="moo-login-screen">
                            <Link to="/">
                                <img alt="Promoo" src={logo} className="responsive-img"/>
                            </Link>

                            <h3 className="center-align">
                                Recuperar senha
                            </h3>

                            <div className="row">
                                <div className="col s12">
                                    <p className="center-align forgot-password-message">
                                        Digite seu e-mail abaixo e nós lhe enviaremos instruções sobre como recuperar
                                        sua senha.
                                    </p>
                                </div>
                            </div>

                            <ForgotPasswordForm/>

                            <div className="row">
                                <div className="col s12">
                                    <p className="messages">
                                        Lembrou a senha?
                                        <Link to="/signin">Entre</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}