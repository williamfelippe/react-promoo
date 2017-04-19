import React, {Component} from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import OfferItem from "../offer-item/offer-item";
import "./offer-list.css";

export default class OfferList extends Component {
    render() {
        const listOffers = this.props.offers.map((offer) =>
            <li key={offer._id}>
                <OfferItem offer={offer}/>
            </li>
        );

        return (
            <ul className="moo-offer-list">
                <ReactCSSTransitionGroup 
                    transitionName="list-animations"
                    transitionAppear={true}
                    transitionAppearTimeout={400}
                    transitionEnterTimeout={400} 
                    transitionLeaveTimeout={300}>
                    {listOffers}
                </ReactCSSTransitionGroup>
            </ul>
        )
    }
}