import React, {Component} from 'react';
import {Link} from 'react-router';
import {Row, Col, Button, Icon} from 'react-materialize';
import './header.css';

export default class Header extends Component {
    constructor() {
        super();
        this.signout = this.signout.bind(this);
    }

    signout() {
        console.log('Sair');
    }

    render() {
        const isLoggedIn = true;//this.state.isLoggedIn;
        return (
            <section className="moo-nav-bar">
                <div className="container">
                    <Row className="n-margin-bottom">
                        <Col s={12} className="hide-on-med-and-up moo-mobile-menu">
                            <button className='dropdown-button' data-activates='menu'>
                                <Icon>menu</Icon>
                            </button>

                            <ul id='menu' className='dropdown-content content'>
                                <li className={!isLoggedIn ? 'hide' : ''}>
                                    <Link to="dashboard">Meu Promoo</Link>
                                </li>

                                <li>
                                    <Link to="about">Sobre</Link>
                                </li>

                                <li>
                                    <Link to="contact">Fale conosco</Link>
                                </li>

                                <li className={isLoggedIn ? 'hide' : ''}>
                                    <Link to="signup">Registrar</Link>
                                </li>

                                <li className={isLoggedIn ? 'hide' : ''}>
                                    <Link to="signin">Entrar</Link>
                                </li>

                                <li className={!isLoggedIn ? 'hide' : ''}>
                                    <a onClick={this.signout}>
                                        Sair
                                    </a>
                                </li>
                            </ul>
                        </Col>

                        <Col s={12} m={5} l={3}>
                            <div className="valign-wrapper">
                                <Link to="/" className="moo-logo-text">
                                    <h4 className="center-align valign">
                                        pro<span>MOO</span>
                                    </h4>
                                </Link>
                            </div>
                        </Col>

                        <Col s={12} m={7} l={9} className="hide-on-small-and-down">
                            <ul className="moo-menu">
                                <li className={!isLoggedIn ? 'hide' : ''}>
                                    <Link to="dashboard">Meu Promoo</Link>
                                </li>
                                <li>
                                    <Link to="about">Sobre</Link>
                                </li>
                                <li>
                                    <Link to="contact">Contato</Link>
                                </li>
                                <li className={isLoggedIn ? 'hide' : ''}>
                                    <Link to="signup" className="signup-button">Registrar</Link>
                                </li>
                                <li className={isLoggedIn ? 'hide' : ''}>
                                    <Link to="signin" className="waves-effect waves-light btn">Entrar</Link>
                                </li>
                                <li className={!isLoggedIn ? 'hide' : ''}>
                                    <Button onClick={this.signout} waves="light" className="btn">
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