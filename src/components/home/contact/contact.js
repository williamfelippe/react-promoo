import React, {Component} from 'react';
import {Link} from 'react-router';
import {Row, Col} from 'react-materialize';
import './contact.css';

export default class Contact extends Component {
    render() {
        return (
            <Row className="moo-home-contact">
                <Col s={12}>
                    <div className="container">
                        <Row>
                            <Col s={12} m={8}>
                                <p>
                                    Tem alguma dúvida? Viu algum bug em nossos aplicativos? Quer ser nosso parceiro?
                                    Quer apenas parabenizar pelo trabalho?
                                </p>
                                <p>
                                    Clica aí do lado e deixa um recado.<br/>
                                    Responderemos prontamente ;)
                                </p>
                            </Col>
                            <Col s={12} m={4}>
                                <Link to="contato" className="waves-effect waves-light btn btn-large">
                                    Fale conosco
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        )
    }
}