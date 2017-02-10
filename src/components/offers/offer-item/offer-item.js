import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon, Col, CardPanel} from 'react-materialize';
import ImageLoader from '../../util/image-loader/image-loader';
import OfferReportButton from '../../../components/offers/offer-report-button/offer-report-button';
import * as dateFormat from '../../../utils/date-format';
import * as currencyFormat from '../../../utils/currency-format';
import * as offerService from '../../../services/offer-service';
import * as userInformationStore from '../../../utils/user-information-store';
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

    componentDidMount() {
        this.countEvaluations();
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
            user_id: userInformationStore.getLoggedUserId(),
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

    countEvaluations() {
        const evaluations = this.props.offer.evaluations;

        let likes = 0, dislikes = 0;
        evaluations.forEach((evaluation) => {
            if (userInformationStore.isLoggedIn()) {
                if (evaluation.user === userInformationStore.getLoggedUserId() && evaluation.like) {
                    this.setState({liked: true});
                }
                else if (evaluation.user === userInformationStore.getLoggedUserId() && evaluation.dislike) {
                    this.setState({disliked: true});
                }
            }

            if (evaluation.like) {
                likes++;
            }
            else if (evaluation.dislike) {
                dislikes++;
            }
        });

        this.setState({likes: likes, dislikes: dislikes});
    }

    render() {
        const offer = this.props.offer;

        return (
            <Col s={this.props.s} m={this.props.m} l={this.props.l}>
                <CardPanel className="moo-offer-card">
                    <div className="right-align category">
                        {/* Categoria */}
                        { offer.category.name }
                    </div>

                    <div className="name center-align truncate">
                        {/* Nome */}
                        { offer.name }
                    </div>

                    <div className="store center-align">
                        {/* Loja */}
                        { offer.store.name }
                    </div>

                    <div className="price center-align">
                        {/* Preço */}
                        { currencyFormat.format(offer.price) }
                    </div>

                    <div className="date center-align">
                        {/* Data */}
                        <small>{ dateFormat.format(offer.created_at) }</small>
                    </div>

                    <div className="actions center-align">
                        <ul>
                            <li>
                                <a className={this.state.liked ? 'active' : ''}>
                                    <Icon className="thumbs_up">thumb_up</Icon> {this.state.likes}
                                </a>
                            </li>
                            <li>
                                <a className={this.state.disliked ? 'active' : ''}>
                                    <Icon className="thumbs_down">thumb_down</Icon> {this.state.dislikes}
                                </a>
                            </li>
                            <li>
                                <a>
                                    <Icon className="comment">
                                        mode_comment
                                    </Icon>
                                </a>
                            </li>
                            <li>
                                <OfferReportButton/>
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