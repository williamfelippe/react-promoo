import React, {Component} from "react";
import OfferItem from '../offer-item/offer-item';

export default class OfferList extends Component {
    render() {
        const listOffers = this.props.offers.map((offer) =>
            <OfferItem offer={offer} s={12} m={6} l={4} key={offer._id}/>
        );

        return (
            <div>
                {listOffers}
            </div>
        )
    }
}