import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import CreateOfferForm from '../../components/create-offer/create-offer-form/create-offer-form';

export default class CreateOffer extends Component {
    render() {
        return (
            <div className="container">
                <Row className="m-b-40">
                    <Col s={12}>
                        <h4 className="center-align">
                            Divulgue uma oferta
                        </h4>
                    </Col>

                    <Col s={12} m={8} offset="m2" className="m-t-40">
                        <CreateOfferForm/>
                    </Col>
                </Row>
            </div>
        )
    }
}