import React, {Component} from 'react';
import {Link} from 'react-router';
import './header.css';

export default class Header extends Component {
    render() {
        const isLoggedIn = true;//this.state.isLoggedIn;
        return (
            <section className="moo-nav-bar">
                <div className="container">
                    <div className="row n-margin-bottom">
                        <div className="col s12 hide-on-med-and-up moo-mobile-menu">
                            <button className='dropdown-button' data-activates='menu'>
                                <i className="material-icons">menu</i>
                            </button>

                            <ul id='menu' className='dropdown-content content'>
                                <li className={!isLoggedIn ? 'hide' : ''}>
                                    <Link to="/dashboard">Meu Promoo</Link>
                                </li>

                                <li>
                                    <Link to="/about">Sobre</Link>
                                </li>

                                <li>
                                    <Link to="/contact">Fale conosco</Link>
                                </li>

                                <li className={isLoggedIn ? 'hide' : ''}>
                                    <Link to="/signup">Registrar</Link>
                                </li>

                                <li className={isLoggedIn ? 'hide' : ''}>
                                    <Link to="/signin">Entrar</Link>
                                </li>

                                <li className={!isLoggedIn ? 'hide' : ''}>
                                    Sair
                                </li>
                            </ul>
                        </div>

                        <div className="col s12 m5 l3">
                            <div className="valign-wrapper">
                                <Link to="/" className="moo-logo-text">
                                    <h4 className="center-align valign">
                                        pro<span>MOO</span>
                                    </h4>
                                </Link>
                            </div>
                        </div>
                        <div className="col s12 m7 l9 hide-on-small-and-down">
                            <ul className="moo-menu">
                                <li className={!isLoggedIn ? 'hide' : ''}>
                                    <Link to="/dashboard">Meu Promoo</Link>
                                </li>
                                <li>
                                    <Link to="/about">Sobre</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contato</Link>
                                </li>
                                <li className={isLoggedIn ? 'hide' : ''}>
                                    <Link to="/signup" className="signup-button">Registrar</Link>
                                </li>
                                <li className={isLoggedIn ? 'hide' : ''}>
                                    <Link to="/signin" className="waves-effect waves-light btn">Entrar</Link>
                                </li>
                                <li className={!isLoggedIn ? 'hide' : ''}>
                                    Sair
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}