import React, {Component} from "react";
import {Col, Icon, Row} from "react-materialize";
import {formatDate} from "../../../utils/date-format";
import {formatCurrency} from "../../../utils/currency-format";
import {isLoggedIn} from "../../../utils/user-information-store";
import OfferUserAvatar from "../../offers/offer-user-avatar/offer-user-avatar";
import OfferReportButton from "../../offers/offer-report-button/offer-report-button";
import "./offer-detail-info.css";

export default class OfferDetailInfo extends Component {
    render() {
        const {offer} = this.props;

        return (
            <Col s={12} className="moo-offer-detail-info">
                <div className="container">
                    <Row className="n-margin-bottom">
                        <Col s={12} m={6} className="push-m6">
                            <OfferUserAvatar user={offer.user} className="avatar"/>
                        </Col>

                        <Col s={12} m={6} className="pull-m6">
                            <p className="date">
                                <span>{formatDate(offer.created_at)}</span>
                            </p>
                        </Col>
                    </Row>

                    <Row>
                        <Col s={12}>
                            <h1 className="title">
                                {offer.name}

                                <sub className="brand">
                                    {
                                        /* Marca */
                                        offer.brand
                                    }
                                </sub>
                            </h1>

                            <p className="category">
                                Categoria: <span>{offer.category.name}</span>
                            </p>

                            <p className="price">
                                {formatCurrency(offer.price)}
                            </p>
                        </Col>

                        <Col s={12}>
                            <ul className="evaluate">
                                <li>
                                    <a className={this.props.liked ? 'active' : ''} onClick={this.props.like}>
                                        <Icon>thumb_up</Icon> {this.props.likes}
                                    </a>
                                </li>
                                <li>
                                    <a className={this.props.disliked ? 'active' : ''} onClick={this.props.dislike}>
                                        <Icon>thumb_down</Icon> {this.props.dislikes}
                                    </a>
                                </li>
                                <li>
                                    {isLoggedIn() && <OfferReportButton/>}
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Col>
        );
    }
}