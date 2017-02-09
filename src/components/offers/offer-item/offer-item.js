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
            <Col s={this.props.s} m={this.props.m} l={this.props.l}>
                <CardPanel className="moo-offer-card-test">
                    <div className="right-align category">
                        {/* Categoria */}
                    </div>

                    <div className="name center-align">
                        {/* Nome */}
                    </div>

                    <div className="store right-align">
                        {/* Loja */}
                    </div>

                    <div className="price center-align">
                        {/* Preço */}
                    </div>

                    <div className="actions center-align">
                        <ul>
                            <li>
                                <a>
                                    <Icon>thumb_up</Icon>
                                    {this.state.likes}
                                </a>
                            </li>
                            <li>
                                <a>
                                    <Icon>thumb_down</Icon>
                                    {this.state.dislikes}
                                </a>
                            </li>
                            <li>
                                <a>
                                    <Icon>mode_comment</Icon>
                                </a>
                            </li>
                            <li>
                                <a className="report">
                                    <Icon>block</Icon>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
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
                </CardPanel>
            </Col>
        )
    }
}