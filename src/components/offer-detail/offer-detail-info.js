import React, {Component} from "react";
import {Col} from "react-materialize";
import OfferUserAvatar from "../offers/offer-user-avatar/offer-user-avatar";
import * as dateFormat from "../../utils/date-format";
import * as currencyFormat from "../../utils/currency-format";
import "./offer-detail-info.css";

export default class OfferDetailInfo extends Component {
    render() {
        const {offer} = this.props;

        return (
            <Col s={12} className="moo-offer-detail-info">
                <div className="container">
                    <OfferUserAvatar user={offer.user} className="avatar" />

                    <h1 className="title">
                        {offer.name}
                    </h1>

                    <p className="date">
                        <span>{dateFormat.format(offer.created_at)}</span>
                    </p>

                    <p className="price">
                        {currencyFormat.format(offer.price)}
                    </p>
                </div>
            </Col>
        );
    }
}