import React, {Component} from "react";
import {browserHistory} from "react-router";
import {Row, Col, Button, Icon} from "react-materialize";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import logo from "../../../../public/images/logo.png";
import "./banner.css";

export default class Banner extends Component {
    createOffer() {
        browserHistory.push('dashboard/criar-oferta');
    }

    render() {
        return (
            <header>
                <Row className="moo-home-banner">
                    <Col s={12} className="center-align">

                        <ReactCSSTransitionGroup
                            transitionName="logo"
                            transitionAppear={true}
                            transitionAppearTimeout={400}
                            transitionEnterTimeout={400}
                            transitionLeaveTimeout={300}>

                            <img alt="Promoo" src={logo} className="responsive-img logo"/>

                            <h1>Viu uma promoção?</h1>
                            <p>Ajude outras pessoas a realizar uma compra mais barata.</p>
                            <p>
                                <Button waves="light" onClick={this.createOffer.bind(this)}>
                                    Divulgue
                                </Button>
                            </p>
                        </ReactCSSTransitionGroup>

                        <Icon className="moo-indicator-arrow">keyboard_arrow_down</Icon>
                    </Col>
                </Row>
            </header>
        )
    }
}