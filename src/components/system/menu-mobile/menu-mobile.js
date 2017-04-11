import React, {Component} from "react";
import {Icon} from "react-materialize";
import {browserHistory, Link} from "react-router";
import {clearUserStore, isLoggedIn} from "../../../utils/user-information-store";
import PubSub from "pubsub-js";
import "./menu-mobile.css";

const TAG = "show-or-hide-menu-mobile";

export default class MenuMobile extends Component {
    constructor() {
        super();
        this.state = {open: false};
    }

    componentDidMount() {
        PubSub.subscribe(TAG, (subject, message) => {
            if (subject.localeCompare(TAG) === 0) {
                this.setState({open: message.status});
            }
        });
    }

    //noinspection JSMethodCanBeStatic
    signout() {
        this.close();

        clearUserStore();
        browserHistory.push('/');
    }

    close() {
        this.setState({open: false});
    }

    render() {
        const status = (this.state.open) ? 'increase' : 'decrease';

        return (
            <div className={`hide-on-med-and-up moo-mobile-menu ${status}`}>
                <a onClick={this.close.bind(this)} className="close">
                    <Icon>close</Icon>
                </a>

                <ul>
                    <li>
                        <Link to="dashboard" activeClassName="active"
                              onClick={this.close.bind(this)}>
                            Meu Promoo
                        </Link>
                    </li>

                    <li>
                        <Link to="sobre" activeClassName="active"
                              onClick={this.close.bind(this)}>
                            Sobre
                        </Link>
                    </li>

                    <li>
                        <Link to="contato" activeClassName="active"
                              onClick={this.close.bind(this)}>
                            Fale conosco
                        </Link>
                    </li>

                    <li>
                        <Link className={isLoggedIn() ? 'hide' : ''} to="registrar"
                              onClick={this.close.bind(this)}>
                            Registrar
                        </Link>
                    </li>

                    <li>
                        <Link className={isLoggedIn() ? 'hide' : ''} to="entrar"
                              onClick={this.close.bind(this)}>
                            Entrar
                        </Link>
                    </li>

                    <li>
                        <a className={!isLoggedIn() ? 'hide' : ''}
                           onClick={this.signout.bind(this)}>
                            Sair
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}