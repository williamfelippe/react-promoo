import React, {Component} from "react";
import {Link} from "react-router";
import {Icon} from "react-materialize";
import ReactTooltip from "react-tooltip";
import "./user-bar.css";

export default class UserBar extends Component {
    render() {
        return (
            <ul className="right moo-user-bar">
                <li data-tip="Perfil">
                    <Link to="dashboard/usuario/perfil-usuario" activeClassName="active">
                        <Icon>dashboard</Icon>
                    </Link>
                </li>

                <li data-tip="Editar avatar">
                    <Link to="dashboard/usuario/editar-avatar" activeClassName="active">
                        <Icon>insert_photo</Icon>
                    </Link>
                </li>
                <li data-tip="Editar e-mail">
                    <Link to="dashboard/usuario/editar-email" activeClassName="active">
                        <Icon>email</Icon>
                    </Link>
                </li>
                <li data-tip="Editar senha">
                    <Link to="dashboard/usuario/editar-senha" activeClassName="active">
                        <Icon>vpn_key</Icon>
                    </Link>
                </li>
                <ReactTooltip className="hide-on-small-and-down" place="bottom" type="dark" effect="solid"/>
            </ul>
        )
    }
}