import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Row, Col, Button} from 'react-materialize';
import * as userInformationStore from "../../../utils/user-information-store";
import logo from '../../../../public/images/logo.png';
import './banner.css';

export default class Banner extends Component {
    createOffer() {
        browserHistory.push((userInformationStore.isLoggedIn())
            ? 'dashboard/create-offer'
            : 'signin');
    }

    render() {
        return (
            <header>
                <Row className="moo-home-banner">
                    <Col s={12} className="center-align">

                        <img alt="Promoo" src={logo} className="responsive-img logo"/>

                        <h1>Viu uma promoção?</h1>
                        <p>Ajude outras pessoas a realizar uma compra mais barata.</p>
                        <p>
                            <Button waves="light" large onClick={this.createOffer.bind(this)}>
                                Indique aqui
                            </Button>
                        </p>
                    </Col>
                </Row>
            </header>
        )
    }
}