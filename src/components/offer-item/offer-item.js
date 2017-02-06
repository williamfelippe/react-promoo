import React, {Component} from 'react';
import {Link} from 'react-router';
import * as dateFormat from '../../utils/date-format';
import * as currencyFormat from '../../utils/currency-format';
//import * as offerApi from '../../../api/offer-api';
import './offer-item.css';

export default class OfferItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likes: 0,
            dislikes: 0,
            liked: false,
            disliked: false
        };
    }

    likeOffer() {}

    dislikeOffer() {}

    render() {
        const offer = this.props.offer;

        return (
            <div className="card moo-card-offer hoverable">
                <div className="card-content">
                    <small className="date right">
                        {dateFormat.format(offer.created_at)}
                    </small>
                    <div className="clearfix"></div>

                    <span className="card-title truncate">
                        {offer.name}
                    </span>

                    <p className="category">
                        {offer.category.name}
                    </p>

                    <p className="price">
                        {currencyFormat.format(offer.price)}
                    </p>

                    <p className="description">
                        {offer.description}
                    </p>

                    <ul>
                        <li>
                            <a
                                onClick={this.likeOffer}
                                className={this.state.like
                                ? 'active'
                                : ''}>
                                <i className="material-icons">thumb_up</i>
                                <small>
                                    {this.state.likes}
                                </small>
                            </a>
                        </li>

                        <li>
                            <a
                                onClick={this.dislikeOffer}
                                className={this.state.dislike
                                ? 'active'
                                : ''}>
                                <i className="material-icons">thumb_down</i>
                                <small>
                                    {this.state.dislikes}
                                </small>
                            </a>
                        </li>

                        <li>
                            <a onClick={this.openComments}>
                                <i className="material-icons">chat_bubble</i>
                            </a>
                        </li>

                        <li>
                            <a onClick={this.indicateExpiredOffer} className="report">
                                <i className="material-icons">block</i>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="card-action">
                    <Link to="/user-detail" className="avatar">
                        <div className="right valign-wrapper">
                            <img
                                src={offer.user.photo}
                                alt={offer.user.name}
                                className="circle responsive-img right"/>
                            <span className="right">
                                {offer.user.name}
                            </span>
                        </div>
                        <div className="clearfix"></div>
                    </Link>
                </div>
            </div>
        )
    }
}