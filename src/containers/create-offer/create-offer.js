import React, {Component} from 'react';
import CreateOfferForm from '../../components/create-offer-form/create-offer-form';

export default class CreateOffer extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h4 className="center-align">
                            Divulgue uma oferta
                        </h4>
                    </div>

                    <CreateOfferForm/>

                </div>
            </div>

        )
    }
}