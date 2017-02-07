import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import CreateOfferForm from '../../components/offers/create-offer-form/create-offer-form';

export default class CreateOffer extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={12}>
                        <h4 className="center-align">
                            Divulgue uma oferta
                        </h4>
                    </Col>

                    <CreateOfferForm/>
                </Row>
            </div>
        )
    }
}