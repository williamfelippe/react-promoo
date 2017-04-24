import React, {Component} from "react";
import {Link} from "react-router";
import {Row, Col} from "react-materialize";
import ForgotPasswordForm from "../../../components/auth/forgot-password-form/forgot-password-form";
import logo from "../../../images/logo.png";

export default class ForgotPassword extends Component {
    render() {
        return (
            <div className="container h-100">
                <Row className="h-100">
                    <Col s={10} offset="s1" className="h-100">
                        <div className="moo-login-screen">
                            <Link to="/">
                                <img alt="Promoo" src={logo} className="responsive-img"/>
                            </Link>

                            <h3 className="center-align">
                                Recuperar senha
                            </h3>

                            <Row>
                                <Col s={12}>
                                    <p className="center-align forgot-password-message">
                                        Digite seu e-mail abaixo e nós lhe enviaremos instruções sobre como recuperar
                                        sua senha.
                                    </p>
                                </Col>
                            </Row>

                            <ForgotPasswordForm/>

                            <Row>
                                <Col s={12}>
                                    <p className="messages">
                                        Lembrou a senha? <Link to="entrar">Entre</Link>
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}