import React, {Component} from 'react';
import {Link, Icon} from 'react-router';
import './user-bar.css';

export default class UserBar extends Component {
    render() {
        return (
            <ul className="right moo-user-bar">
                <li>
                    <Link to="/">
                        <Icon>dashboard</Icon>
                    </Link>
                </li>
                <li>
                    <Link to="/edit-avatar">
                        <Icon>insert_photo</Icon>
                    </Link>
                </li>
                <li>
                    <Link to="/edit-email">
                        <Icon>email</Icon>
                    </Link>
                </li>
                <li>
                    <Link to="/edit-password">
                        <Icon>vpn_key</Icon>
                    </Link>
                </li>
            </ul>
        )
    }
}