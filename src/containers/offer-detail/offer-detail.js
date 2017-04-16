import React, {Component} from "react";
import {Col, Row} from "react-materialize";
import {browserHistory} from "react-router";
import {publishMessage} from "../../utils/messages-publisher";
import {getOfferById, postOfferEvaluation, getOfferEvaluationsCount} from "../../services/offer-service";
import {clearUserStore, getLoggedUserId, isLoggedIn} from "../../utils/user-information-store";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../utils/constants";
import {expiredSessionError, opsInternalError} from "../../utils/strings";
import Loader from "../../components/util/loader/loader";
import OfferDetailInfo from "../../components/offer-detail/offer-detail-info/offer-detail-info";
import OfferDetailStore from "../../components/offer-detail/offer-detail-store/offer-detail-store";
import OfferCommentBox from "../../components/offers/offer-comment-box/offer-comment-box";
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

                publishMessage(opsInternalError);
                this.setState({loadingOffer: false});
            })
    }

    treatOfferResponse(response) {
        const statusCode = response.status;

        if (statusCode === REQUEST_SUCCESS) {
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

                if (statusCode === REQUEST_SUCCESS) {
                    console.log(response.data);
                    this.countEvaluations();
                }
                else {
                    throw new Error(response.data);
                }
            })
            .catch((error) => {
                console.log(error);

                const status = error.response.status;
                console.log(status);
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
        const {offer} = this.state;

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

    render() {
        return (
            <Row className="moo-offer-detail">
                {
                    (Object.keys(this.state.offer).length !== 0) ?
                        <OfferDetailInfo
                            offer={this.state.offer} likes={this.state.likes}
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
                        {(Object.keys(this.state.offer).length !== 0) && <OfferCommentBox offerId={this.state.offer._id}/>}
                    </div>
                </Col>
            </Row>
        );
    }
}