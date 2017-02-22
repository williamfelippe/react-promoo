import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon} from 'react-materialize';
import './user-bar.css';

export default class UserBar extends Component {
    render() {
        return (
            <ul className="right moo-user-bar">
                <li>
                    <Link to="dashboard/user/user-profile">
                        <Icon>dashboard</Icon>
                    </Link>
                </li>
                <li>
                    <Link to="dashboard/user/edit-avatar">
                        <Icon>insert_photo</Icon>
                    </Link>
                </li>
                <li>
                    <Link to="dashboard/user/edit-email">
                        <Icon>email</Icon>
                    </Link>
                </li>
                <li>
                    <Link to="dashboard/user/edit-password">
                        <Icon>vpn_key</Icon>
                    </Link>
                </li>
            </ul>
        )
    }
}