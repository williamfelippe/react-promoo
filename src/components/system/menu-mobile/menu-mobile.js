import React, {Component} from "react";
import HamburgerMenu from "react-hamburger-menu";
import {Col} from "react-materialize";

export default class MenuMobile extends Component {
    constructor() {
        super();

        this.state = { open: false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <Col s={12} className="hide-on-med-and-up moo-mobile-menu">
                <HamburgerMenu isOpen={this.state.open} menuClicked={this.handleClick} width={17} height={14} />

                {
                    /*
                     <Link to="dashboard" className="menu-item">Meu Promoo</Link>
                     <Link to="about" className="menu-item">Sobre</Link>
                     <Link to="contact" className="menu-item">Fale conosco</Link>
                     <Link className={this.props.isLoggedIn ? 'hide' : 'menu-item'} to="signup">Registrar</Link>
                     <Link className={this.props.isLoggedIn ? 'hide' : 'menu-item'} to="signin">Entrar</Link>
                     <a className={!this.props.isLoggedIn ? 'hide' : 'menu-item'} onClick={this.props.signout}>
                     Sair
                     </a>
                     */
                }
            </Col>
        )
    }
}