import React, {Component} from "react";
import {Col} from "react-materialize";
import * as dateFormat from "../../utils/date-format";
import * as currencyFormat from "../../utils/currency-format";
import "./offer-detail-info.css";

export default class OfferDetailInfo extends Component {
    render() {
        const {offer} = this.props;

        return (
            <Col s={12} className="moo-offer-detail-info">
                <div className="container">
                    <h1>
                        {offer.name}
                    </h1>

                    <p className="date">
                        {dateFormat.format(offer.created_at)}
                    </p>

                    <p className="price">
                        { (offer.price) ? currencyFormat.format(offer.price) : ''}
                    </p>
                </div>
            </Col>
        );
    }
}