import React, {Component} from "react";
import {Row, Col, Button} from "react-materialize";
import "./add-bar.css";

export default class AddBar extends Component {
    render() {
        return (
            <Col s={12} className="n-padding">
                <Row className="moo-add-bar">
                    <div className="container">
                        <Col s={6}>
                            <b>{this.props.amount} ofertas encontradas</b>
                        </Col>
                        <Col s={6} className="right-align">
                            <div>
                                <Button onClick={this.props.redirectToPage} waves='light'
                                        className="m-r-20">
                                    {this.props.buttonName}
                                </Button>
                            </div>
                        </Col>
                    </div>
                </Row>
            </Col>
        )
    }
}