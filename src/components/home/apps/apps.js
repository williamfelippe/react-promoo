import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import './apps.css';

export default class Apps extends Component {
    render() {
        return (
            <Row className="moo-home-apps">
                <Col s={12}>
                    <div className="container">
                        <h3 className="center-align">
                            promoo<b>app</b>
                        </h3>

                        <Row className="n-margin-bottom">
                            <Col s={12} m={5}>
                                <p className="highlight">
                                    Acesse o <strong>Promoo</strong> de qualquer lugar. Baixe para IOS e Android
                                </p>

                                <ul>
                                    <li>
                                        <a href="#" target="_blank">
                                            <span className="play" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                            <span className="app" />
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                            <Col s={12} m={7}>
                                <div className="phone"></div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        )
    }
}