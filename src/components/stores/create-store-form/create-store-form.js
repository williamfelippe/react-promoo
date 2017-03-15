import React, {Component} from "react";
import {Row, Col, Input, Button} from 'react-materialize';
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

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    submit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <form onSubmit={this.submit.bind(this)}>
                <Row>
                    <Input s={12} type="text" label="Nome da loja" onChange={this.onChangeName.bind(this)}/>
                </Row>

                <Row>
                    <Col s={12}>
                        <Button waves="light" type="submit" className="right">
                            Indicar
                        </Button>
                    </Col>
                </Row>
            </form>
        )
    }
}