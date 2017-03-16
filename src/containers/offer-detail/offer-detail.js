import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import Loader from "../../components/util/loader/loader";
import OfferDetailInfo from "../../components/offer-detail/offer-detail-info/offer-detail-info";
import OfferDetailStore from "../../components/offer-detail/offer-detail-store/offer-detail-store";
import OfferCommentBox from "../../components/offers/offer-comment-box/offer-comment-box";
import {getOfferById, postOfferEvaluation} from "../../services/offer-service";
import * as messagesPublisher from "../../utils/messages-publisher";
import {isLoggedIn, getLoggedUserId} from "../../utils/user-information-store";
import "./offer-detail.css";

export default class OfferDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offer: {},
            center: {},
            loadingOffer: false,
            loadingComments: false,
            likes: 0,
            dislikes: 0,
            liked: false,
            disliked: false
        }
    }

    componentDidMount() {
        const {offerId} = this.props.params;
        this.getOffer(offerId);
    }

    getOffer(offerId) {
        this.setState({loadingOffer: true});

        getOfferById(offerId)
            .then((response) => {
                this.treatOfferResponse(response);
                this.setState({loadingOffer: false});
            })
            .catch((error) => {
                console.log('ERRO EM DETAIL');
                console.log(error);

                messagesPublisher.showMessage("Ops... Parece que estamos com alguns problemas");
                this.setState({loadingOffer: false});
            })
    }

    treatOfferResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            const offer = response.data;
            console.log("OFERTA");
            console.log(offer);
            this.setState({
                offer: offer,
                center: {
                    lat: offer.store.address.latitude,
                    lng: offer.store.address.longitude
                }
            });

            this.countEvaluations();
        }
        else {
            throw new Error(response.data);
        }
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

        console.log(`Evaluate ${data}`);

        postOfferEvaluation(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    console.log(response.data);
                    this.countEvaluations();
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
        const evaluations = this.state.offer.evaluations;

        let likes = 0, dislikes = 0;
        evaluations.forEach((evaluation) => {
            if (isLoggedIn()) {
                if (evaluation.user === getLoggedUserId() && evaluation.like) {
                    this.setState({liked: true});
                }
                else if (evaluation.user === getLoggedUserId() && evaluation.dislike) {
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
        return (
            <Row className="moo-offer-detail">
                {
                    (Object.keys(this.state.offer).length !== 0) ?
                        <OfferDetailInfo offer={this.state.offer} likes={this.state.likes}
                                         dislikes={this.state.dislikes} liked={this.state.liked}
                                         disliked={this.state.disliked}/>
                        : <Loader />
                }

                <Col s={10} offset="s1">
                    <div className="divider"/>
                </Col>

                {
                    (Object.keys(this.state.offer).length !== 0) &&
                    <OfferDetailStore store={this.state.offer.store} center={this.state.center}/>
                }

                <Col s={10} offset="s1">
                    <div className="container">
                        {
                            (this.state.offer) && <OfferCommentBox offerId={this.state.offer._id}/>
                        }
                    </div>
                </Col>
            </Row>
        );
    }
}