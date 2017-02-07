import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import CreateStoreForm from '../../components/stores/create-store-form/create-store-form';

export default class CreateStore extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={12}>
                        <h4 className="center-align">
                            Indique uma loja
                        </h4>
                    </Col>

                    <CreateStoreForm />
                </Row>
            </div>
        )
    }
}