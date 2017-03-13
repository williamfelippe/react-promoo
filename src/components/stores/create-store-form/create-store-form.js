import React, {Component} from "react";
import {Row, Col} from 'react-materialize';
import "./create-store-form.css";

export default class CreateStoreForm extends Component {
    static defaultProps = {
        center: {lat: 59.95, lng: 30.33},
        zoom: 18
    };

    constructor(props) {
        super(props);
        this.state = {location: {}, name: ''};
    }

    submit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.submit.bind(this)}>
                <Row>
                    <Col s={12} className="n-padding">
                    </Col>
                </Row>
            </form>
        )
    }
}