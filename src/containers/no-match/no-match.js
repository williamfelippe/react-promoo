import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import {Link} from "react-router";
import logo from "../../images/logo.png";
import "./no-match.css";

export default class NoMatch extends Component {
    render() {
        return (
            <Row className="moo-no-match">
                <Col s={12}>
                    <div className="container">
                        <p className="center-align">
                            <Link to="/">
                                <img alt="Promoo" src={logo} className="responsive-img"/>
                            </Link>
                        </p>

                        <h1>Oops...</h1>

                        <h4>
                            Não foi possível encontrar a página que você procura
                        </h4>
                    </div>
                </Col>
            </Row>
        )
    }
}