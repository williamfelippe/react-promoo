import React, {Component} from "react";
import {Link} from "react-router";
import {Row, Col} from "react-materialize";
import SigninForm from "../../../components/auth/signin-form/signin-form";
import logo from "../../../images/logo.png";
import "../auth.css";

export default class Signin extends Component {
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
                                Entrar
                            </h3>

                            <SigninForm/>

                            <Row>
                                <Col s={12} m={5}>
                                    <p className="messages">
                                        <Link to="esqueci-a-senha">
                                            Esqueceu sua senha?
                                        </Link>
                                    </p>
                                </Col>
                                <Col s={12} m={7}>
                                    <p className="messages">
                                        Não é registrado? <Link to="registrar">Registre-se</Link>
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