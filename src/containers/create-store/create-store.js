import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import CreateStoreForm from '../../components/create-store/create-store-form/create-store-form';

export default class CreateStore extends Component {
    render() {
        return (
            <div className="container">
                <Row className="m-b-40">
                    <Col s={12}>
                        <h4 className="center-align">
                            Indique uma loja
                        </h4>
                    </Col>

                    <Col s={12} m={8} offset="m2" className="m-t-40">
                        <CreateStoreForm/>
                    </Col>
                </Row>
            </div>
        )
    }
}