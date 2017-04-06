import React, {Component} from "react";
import {Col, Row} from "react-materialize";
import {browserHistory} from "react-router";
import {clearUserStore, getLoggedUserId} from "../../../utils/user-information-store";
import {getOffersByUser} from "../../../services/offer-service";
import {getUser} from "../../../services/user-service";
import {publishMessage} from "../../../utils/messages-publisher";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../../utils/constants";
import {expiredSessionError, opsInternalError} from "../../../utils/strings";
import Loader from "../../../components/util/loader/loader";
import LoadMoreButton from "../../../components/util/load-more-button/load-more-button";
import UserInfoHeader from "../../../components/user/user-info-header/user-info-header";
import OfferList from "../../../components/offers/offer-list/offer-list";
import NoContent from "../../../components/util/no-content/no-content";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            offers: [],
            limit: 10,
            offerOffset: 0,
            loadingOffers: false,
            loadingUser: false
        }
    }

    componentDidMount() {
        const userId = (this.props.params.userId)
            ? this.props.params.userId
            : getLoggedUserId();

        this.getUserById(userId);
        this.getUserOffers(userId);
    }

    getUserById(userId) {
        this.setState({loadingUser: true});

        getUser(userId)
            .then((response) => {
                this.treatUserResponse(response);
                this.setState({loadingUser: false});
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
            })
    }

    treatUserResponse(response) {
        const statusCode = response.status;

        if (statusCode === REQUEST_SUCCESS) {
            this.setState({user: response.data});
            console.log("USER");
            console.log(this.state.user);
        }
        else {
            throw new Error(response.data);
        }
    }

    getUserOffers(userId) {
        this.setState({loadingOffers: true});


        getOffersByUser(userId, this.state.limit, this.state.offerOffset)
            .then((response) => {
                this.treatOffersResponse(response);
                this.setState({loadingOffers: false});
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
            })
    }

    treatOffersResponse(response) {
        const statusCode = response.status;

        if (statusCode === REQUEST_SUCCESS) {
            this.setState({offers: response.data});
            console.log(this.state.offers);
        }
        else {
            throw new Error(response.data);
        }
    }

    moreUserOffers() {
        this.setState({offset: this.state.limit});
        this.getUserOffers(this.state.user._id);
    }

    render() {
        return (
            <Row>
                {
                    (this.state.user && this.state.user !== undefined) &&
                    <UserInfoHeader user={this.state.user}/>
                }

                {
                    /* Exibe uma imagem de "loading" */
                    (this.state.loadingUser) && <Loader />
                }

                <div className="container">
                    <Row>
                        <Col s={12}>
                            <h5 className="center-align">
                                Minhas Ofertas
                            </h5>

                            <OfferList offers={this.state.offers}/>

                            {
                                (this.state.offers.length <= 0 && !this.state.loadingOffers) &&
                                <NoContent message="Você ainda não divulgou nenhuma oferta =("/>
                            }

                            {
                                /* Permite a busca de mais ofertas ou exibe uma imagem de "loading" */
                                (this.state.offers.length > 0) &&
                                <LoadMoreButton loading={this.state.loadingOffers}
                                                onClick={this.moreUserOffers.bind(this)}/>
                            }
                        </Col>
                    </Row>
                </div>
            </Row>
        )
    }
}