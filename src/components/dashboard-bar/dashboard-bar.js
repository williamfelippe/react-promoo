import React, {Component} from 'react';
import {Link} from 'react-router';
import {Row, Col, Icon} from 'react-materialize';
import './dashboard-bar.css';

export default class DashboardBar extends Component {
    render() {
        return (
            <Row className="moo-dashboard-bar">
                <Col s={12}>
                    <div className="container">
                        <Row>
                            <Col s={12}>
                                <ul>
                                    <li>
                                        <Link to="dashboard">
                                            <div className="hide-on-med-and-down">
                                                Ofertas
                                            </div>
                                            <div className="hide-on-large-only">
                                                <Icon>shopping_basket</Icon>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="stores">
                                            <div className="hide-on-med-and-down">
                                                Lojas
                                            </div>
                                            <div className="hide-on-large-only">
                                                <Icon>store</Icon>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="dashboard/user">
                                            <div className="hide-on-med-and-down">
                                                Para mim
                                            </div>
                                            <div className="hide-on-large-only">
                                                <Icon>person</Icon>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        )
    }
}