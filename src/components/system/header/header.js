import React, {Component} from "react";
import {Link} from "react-router";
import {browserHistory} from "react-router";
import {Row, Col, Button} from "react-materialize";
import * as userInformationStore from "../../../utils/user-information-store";
import "./header.css";

export default class Header extends Component {
    signout() {
        userInformationStore.clear();
        browserHistory.push('/');
    }

    render() {
        const isLoggedIn = userInformationStore.isLoggedIn();
        return (
            <section className="moo-nav-bar">
                <div className="container">
                    <Row className="n-margin-bottom">
                        <Col s={12} m={4} l={3}>
                            <div className="valign-wrapper">
                                <Link to="/" className="moo-logo-text">
                                    <h4 className="center-align valign">
                                        pro<span>MOO</span>
                                    </h4>
                                </Link>
                            </div>
                        </Col>

                        <Col s={12} m={8} l={9} className="hide-on-small-and-down">
                            <ul className="moo-menu">
                                <li>
                                    <Link activeClassName="active" to="dashboard/ofertas">Meu Promoo</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="sobre">Sobre</Link>
                                </li>
                                <li>
                                    <Link activeClassName="active" to="contato">Contato</Link>
                                </li>
                                <li className={isLoggedIn ? 'hide' : ''}>
                                    <Link activeClassName="active" to="registrar" className="signup-button">Registrar</Link>
                                </li>
                                <li className={isLoggedIn ? 'hide' : ''}>
                                    <Link to="entrar" className="waves-effect waves-light btn">
                                        Entrar
                                    </Link>
                                </li>
                                <li className={!isLoggedIn ? 'hide' : ''}>
                                    <Button onClick={this.signout.bind(this)} waves="light" className="btn">
                                        Sair
                                    </Button>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </section>
        )
    }
}