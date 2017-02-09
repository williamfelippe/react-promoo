import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon} from 'react-materialize';
import ImageLoader from '../../util/image-loader/image-loader';
import OfferReportButton from '../../../components/offers/offer-report-button/offer-report-button';
import * as dateFormat from '../../../utils/date-format';
import * as currencyFormat from '../../../utils/currency-format';
import * as offerService from '../../../services/offer-service';
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

        this.likeOffer = this.likeOffer.bind(this);
    }

    likeOffer() {
        if (!this.state.liked) {
            this.setState({liked: true, disliked: false});
            this.evaluate();
        }
    }

    dislikeOffer() {
        if (!this.state.disliked) {
            this.setState({liked: false, disliked: true});
            this.evaluate();
        }
    }

    evaluate() {
        const data = {
            like: this.state.liked,
            dislike: this.state.disliked,
            user_id: 1,//this.userStore.getId(),
            offer_id: this.props.offer._id
        };

        offerService.postOfferEvaluation(data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
                            <a onClick={this.likeOffer} className={this.state.like ? 'active' : ''}>
                                <Icon>thumb_up</Icon>
                                <small>
                                    {this.state.likes}
                                </small>
                            </a>
                        </li>

                        <li>
                            <a onClick={this.dislikeOffer} className={this.state.dislike ? 'active' : ''}>
                                <Icon>thumb_down</Icon>
                                <small>
                                    {this.state.dislikes}
                                </small>
                            </a>
                        </li>

                        <li>
                            <a onClick={this.openComments}>
                                <Icon>chat_bubble</Icon>
                            </a>
                        </li>

                        <li>
                            <OfferReportButton offer={offer}/>
                        </li>
                    </ul>
                </div>

                <div className="card-action">
                    <Link to="user-detail" className="avatar">
                        <div className="right valign-wrapper">
                            <ImageLoader src={offer.user.photo} alt={offer.user.name}
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