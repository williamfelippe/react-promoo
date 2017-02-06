import React, {Component} from 'react';
import {Link} from 'react-router';
import {Row, Col} from 'react-materialize';
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
                                        <Link to="/">
                                            <div className="hide-on-med-and-down">
                                                Ofertas
                                            </div>
                                            <div className="hide-on-large-only">
                                                <i className="material-icons">shopping_basket</i>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/stores">
                                            <div className="hide-on-med-and-down">
                                                Lojas
                                            </div>
                                            <div className="hide-on-large-only">
                                                <i className="material-icons">store</i>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/user">
                                            <div className="hide-on-med-and-down">
                                                Para mim
                                            </div>
                                            <div className="hide-on-large-only">
                                                <i className="material-icons">person</i>
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