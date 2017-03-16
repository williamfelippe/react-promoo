import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import {getOffersByUser} from "../../../services/offer-service";
import Loader from "../../../components/util/loader/loader";
import LoadMoreButton from "../../../components/util/load-more-button/load-more-button";
import UserInfoHeader from "../../../components/user/user-info-header/user-info-header";
import OfferList from "../../../components/offers/offer-list/offer-list";
import {getLoggedUserId} from "../../../utils/user-information-store";
import * as userService from "../../../services/user-service";
import {publishMessage} from "../../../utils/messages-publisher";

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

        this.getUser(userId);
        this.getUserOffers(userId);
    }

    getUser(userId) {
        this.setState({loadingUser: true});

        userService.getUser(userId)
            .then((response) => {
                this.treatUserResponse(response);
                this.setState({loadingUser: false});
            })
            .catch((error) => {
                console.log(error);

                publishMessage("Ops... Parece que estamos com alguns problemas");

                this.setState({loadingUser: false});
            })
    }

    treatUserResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
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

                publishMessage("Ops... Parece que estamos com alguns problemas");

                this.setState({loadingOffers: false});
            })
    }

    treatOffersResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
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
                    (this.state.loadingUser) &&
                    <p className="center-align">
                        <Loader />
                    </p>
                }

                <div className="container">
                    <Row>
                        <Col s={12}>
                            <h5 className="center-align">
                                Ofertas
                            </h5>

                            <OfferList offers={this.state.offers}/>

                            <p className="center-align">
                                {
                                    /* Permite a busca de mais ofertas ou exibe uma imagem de "loading" */
                                    <LoadMoreButton loading={this.state.loadingOffers}
                                                    onClick={this.moreUserOffers.bind(this)}/>
                                }
                            </p>
                        </Col>
                    </Row>
                </div>
            </Row>
        )
    }
}