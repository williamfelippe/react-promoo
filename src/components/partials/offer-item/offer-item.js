import React, {Component} from 'react';
import {Link} from 'react-router';
import * as offerApi from '../../../api/offer-api';
import './offer-item.css';

export default class OfferItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likes: 0,
            dislikes: 0,
            liked: false,
            disliked: false
        }
    }

    likeOffer() {}

    dislikeOffer() {}

    render() {
        return (
            <div className="card moo-card-offer hoverable">
                <div className="card-content">
                    <small className="date right">
                        {props.created_at}
                    </small>
                    <div className="clearfix"></div>

                    <span className="card-title truncate">
                        {props.name}
                    </span>

                    <p className="category">
                        {props.category.name}
                    </p>

                    <p className="price">
                        {props.price}
                    </p>

                    <p className="description">
                        {props.description}
                    </p>

                    <ul>
                        <li>
                            <a
                                onClick={this.likeOffer}
                                className={like
                                ? 'active'
                                : ''}>
                                <i className="material-icons">thumb_up</i>
                                <small>
                                    {likes}
                                </small>
                            </a>
                        </li>

                        <li>
                            <a
                                onClick={this.dislikeOffer}
                                className={dislike
                                ? 'active'
                                : ''}>
                                <i className="material-icons">thumb_down</i>
                                <small>
                                    {dislikes}
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
                                src={props.user.photo}
                                alt={props.user.name}
                                className="circle responsive-img right"/>
                            <span className="right">
                                {props.user.name}
                            </span>
                        </div>
                        <div className="clearfix"></div>
                    </Link>
                </div>
            </div>
        )
    }
}