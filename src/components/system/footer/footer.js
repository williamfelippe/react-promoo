import React, {Component} from 'react';
import {Link} from 'react-router';
import {Row, Col} from 'react-materialize';
import * as userInformationStore from '../../../utils/user-information-store';
import './footer.css';

export default class Footer extends Component {
    render() {
        const isLoggedIn = userInformationStore.isLoggedIn();
        return (
            <footer className="page-footer">
                <div className="container">
                    <Row>
                        <Col s={5} m={3}>
                            <div className="valign-wrapper">
                                <Link to="/" className="moo-logo-text">
                                    <h4 className="center-align valign">
                                        pro<span>MOO</span>
                                    </h4>
                                </Link>
                            </div>
                        </Col>

                        <Col s={7} m={9}>
                            <Row className="row">
                                <Col s={12} m={4} l={3} offset="l3">
                                    <strong className="white-text">Links</strong>
                                    <ul>
                                        <li>
                                            <Link to="about">Sobre nós</Link>
                                        </li>
                                        <li>
                                            <Link to="contact">Fale conosco</Link>
                                        </li>
                                        <li>
                                            <Link to="terms">Termos de uso</Link>
                                        </li>
                                        <li className={isLoggedIn ? 'hide' : ''}>
                                            <Link to="signup">Registrar</Link>
                                        </li>
                                        <li className={isLoggedIn ? 'hide' : ''}>
                                            <Link to="signin">Entrar</Link>
                                        </li>
                                    </ul>
                                </Col>

                                <Col s={12} m={4} l={3}>
                                    <strong className="white-text">Apps</strong>
                                    <ul>
                                        <li>
                                            <a href="#">Android</a>
                                        </li>
                                        <li>
                                            <a href="#">IOS</a>
                                        </li>
                                    </ul>
                                </Col>

                                <Col s={12} m={4} l={3}>
                                    <strong className="white-text">Redes sociais</strong>
                                    <ul className="moo-social-media">
                                        <li>
                                            <a href="#" target="_blank">
                                                Facebook
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" target="_blank">
                                                Twitter
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" target="_blank">
                                                Google+
                                            </a>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div className="footer-copyright">
                    <div className="container">
                        <div className="hide-on-small-and-down">
                            Copyright © 2016 por Promoo. Todos os direitos reservados.
                        </div>
                        <div className="hide-on-med-and-up center-align">
                            © Promoo. Todos os direitos reservados.
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}