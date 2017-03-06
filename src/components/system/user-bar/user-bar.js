import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon} from 'react-materialize';
import './user-bar.css';

export default class UserBar extends Component {
    render() {
        return (
            <ul className="right moo-user-bar">
                <li>
                    <Link to="dashboard/usuario/perfil-usuario">
                        <Icon>dashboard</Icon>
                    </Link>
                </li>
                <li>
                    <Link to="dashboard/usuario/editar-avatar">
                        <Icon>insert_photo</Icon>
                    </Link>
                </li>
                <li>
                    <Link to="dashboard/usuario/editar-email">
                        <Icon>email</Icon>
                    </Link>
                </li>
                <li>
                    <Link to="dashboard/usuario/editar-senha">
                        <Icon>vpn_key</Icon>
                    </Link>
                </li>
            </ul>
        )
    }
}