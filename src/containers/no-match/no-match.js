import React, {Component} from 'react';
import {Row, Col, Button} from "react-materialize";
import './no-match.css';

export default class NoMatch extends Component {
    render() {
        return (
            <Row className="moo-no-match">
                <Col s={12}>
                    <div className="container">
                        <h1>Oops...</h1>

                        <h4>
                            Não foi possível encontrar a página que você procura
                        </h4>

                        <p>
                            Erro 404
                        </p>

                        <ul>
                            <li>
                                <Button waves='light' large>
                                    Home
                                </Button>
                            </li>
                            <li>
                                <Button waves='light' flat large>
                                    Fale conosco
                                </Button>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        )
    }
}