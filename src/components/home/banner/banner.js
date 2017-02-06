import React, {Component} from 'react';
import {Link} from 'react-router';
import {Row, Col} from 'react-materialize';
import logo from '../../../../public/images/logo.png';
import './banner.css';

export default class Banner extends Component {
    render() {
        return (
            <header>
                <Row className="moo-home-banner">
                    <Col s={12} className="center-align">

                        <img alt="Promoo" src={logo} className="responsive-img logo"/>

                        <h1>Viu uma promoção?</h1>
                        <p>Ajude outras pessoas a realizar uma compra mais barata.</p>
                        <p>
                            <Link to="/dashboard" className="waves-effect waves-light btn btn-large">
                                Indique aqui
                            </Link>
                        </p>
                    </Col>
                </Row>
            </header>
        )
    }
}