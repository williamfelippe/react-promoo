import React, {Component} from "react";
import {Link} from "react-router";
import {Icon, CardPanel} from "react-materialize";
import PubSub from 'pubsub-js';
import OfferUserAvatar from "../../offers/offer-user-avatar/offer-user-avatar";
import OfferReportButton from "../../../components/offers/offer-report-button/offer-report-button";
import {postOfferEvaluation} from "../../../services/offer-service";
import {formatDate} from "../../../utils/date-format";
import {formatCurrency} from "../../../utils/currency-format";
import * as userInformationStore from "../../../utils/user-information-store";
import * as messagesPublisher from "../../../utils/messages-publisher";
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
            user_id: userInformationStore.getLoggedUserId(),
            offer_id: this.props.offer._id
        };

        console.log(`Evaluate ${data}`);

        postOfferEvaluation(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    console.log(response.data);
                }
                else {
                    throw new Error(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
                messagesPublisher.showMessage("Ops... Parece que estamos com alguns problemas");
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

    openComments() {
        console.log('Abrir os comentários');

        const message = {openNav: true, offer: this.props.offer};
        PubSub.publish(TAG, message);
    }

    render() {
        const {offer} = this.props;

        return (
            <CardPanel className="moo-offer-card">
                <Link to={`dashboard/oferta/${offer._id}`}>
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
                        { formatCurrency(offer.price) }
                    </div>

                    <div className="date center-align">
                        {/* Data */}
                        <small>
                            { formatDate(offer.created_at) }
                        </small>
                    </div>
                </Link>

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
                            <a onClick={this.openComments.bind(this)}>
                                <Icon className="comment">mode_comment</Icon>
                            </a>
                        </li>
                        <li>
                            {userInformationStore.isLoggedIn() && <OfferReportButton/>}
                        </li>
                    </ul>
                </div>

                <div>
                    <OfferUserAvatar user={offer.user} className="avatar"/>
                </div>
            </CardPanel>
        )
    }
}