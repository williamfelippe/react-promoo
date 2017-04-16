import React, {Component} from "react";
import {Link} from "react-router";
import {Icon, CardPanel} from "react-materialize";
import {browserHistory} from "react-router";
import {postOfferEvaluation, getOfferEvaluationsCount} from "../../../services/offer-service";
import {formatDate} from "../../../utils/date-format";
import {formatCurrency} from "../../../utils/currency-format";
import {clearUserStore, getLoggedUserId, isLoggedIn} from "../../../utils/user-information-store";
import {publishMessage} from "../../../utils/messages-publisher";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../../utils/constants";
import {expiredSessionError, opsInternalError} from "../../../utils/strings";
import PubSub from "pubsub-js";
import ReactTooltip from "react-tooltip";
import OfferUserAvatar from "../../offers/offer-user-avatar/offer-user-avatar";
import OfferReportButton from "../../../components/offers/offer-report-button/offer-report-button";
import "./offer-item.css";

const TAG = "show-or-hide-comment-nav";

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
        this.dislikeOffer = this.dislikeOffer.bind(this);
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
            user_id: getLoggedUserId(),
            offer_id: this.props.offer._id
        };

        postOfferEvaluation(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === REQUEST_SUCCESS) {
                    this.countEvaluations();
                }
                else {
                    throw new Error(response.data);
                }
            })
            .catch((error) => {
                const status = error.response.status;
                
                if (status && status === UNAUTHORIZED) {
                    publishMessage(expiredSessionError);

                    clearUserStore();
                    browserHistory.push('/');
                }
                else {
                    publishMessage(opsInternalError);
                    this.setState({loadingSubmit: false});
                }
            });
    }

    countEvaluations() {
        const {offer} = this.props;

        getOfferEvaluationsCount(offer._id, (isLoggedIn()) ? getLoggedUserId() : null)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === REQUEST_SUCCESS) {
                    const {likes, dislikes, status} = response.data;

                    if(status) this.setState({liked: status.liked, disliked: status.disliked});
                    this.setState({likes, dislikes});
                }
                else {
                    throw new Error(response.data);
                }
            })
            .catch((error) => {
                publishMessage(opsInternalError);
            });
    }

    openComments() {
        const message = {openNav: true, offer: this.props.offer};
        PubSub.publish(TAG, message);
    }

    render() {
        const {offer} = this.props;

        return (
            <CardPanel className="moo-offer-card">
                <Link to={`dashboard/oferta/${offer._id}`}>
                    <div className="right-align category">
                        {
                            /* Categoria */
                            offer.category.name 
                        }
                    </div>

                    <div className="name center-align truncate">
                        {
                            /* Nome */
                            offer.name
                        }

                        <sub className="brand">
                            {
                                /* Marca */
                                offer.brand
                            }
                        </sub>
                    </div>

                    <div className="store center-align">
                        {
                            /* Loja */
                            offer.store.name
                        }
                    </div>

                    <div className="price center-align">
                        {
                            /* Preço */
                            formatCurrency(offer.price)
                        }
                    </div>

                    <div className="date center-align">
                        {
                            /* Data */
                            formatDate(offer.created_at)
                        }
                    </div>
                </Link>

                <div className="actions center-align">
                    <ul>
                        <li data-tip="Curti">
                            <a className={this.state.liked ? 'active' : ''}>
                                <Icon className="thumbs_up">thumb_up</Icon> {this.state.likes}
                            </a>
                        </li>
                        <li data-tip="Não curti">
                            <a className={this.state.disliked ? 'active' : ''}>
                                <Icon className="thumbs_down">thumb_down</Icon> {this.state.dislikes}
                            </a>
                        </li>
                        <li data-tip="Comentar">
                            <a onClick={this.openComments.bind(this)}>
                                <Icon className="comment">mode_comment</Icon>
                            </a>
                        </li>
                        <li data-tip="Denúnciar" className={(isLoggedIn()) ? '' : 'hide'}>
                            {isLoggedIn() && <OfferReportButton/>}
                        </li>
                        <ReactTooltip place="bottom" type="dark" effect="solid"/>
                    </ul>
                </div>

                <div>
                    <OfferUserAvatar user={offer.user} className="avatar"/>
                </div>
            </CardPanel>
        )
    }
}