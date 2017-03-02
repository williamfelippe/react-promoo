import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import axios from "axios";
import UserInfoHeader from "../../../components/user/user-info-header/user-info-header";
import OfferList from "../../../components/offers/offer-list/offer-list";
import StoreList from "../../../components/stores/store-list/store-list";
import * as userInformationStore from "../../../utils/user-information-store";
import * as userService from "../../../services/user-service";
import * as offerService from "../../../services/offer-service";
import * as storeService from "../../../services/store-service";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            offers: [],
            stores: [],
            limit: 10,
            storeOffset: 0,
            offerOffset: 0
        }

        console.log('PARAM ID: ' + this.props.params.userId);
    }

    componentDidMount() {
        this.getAllUserInformations();
    }

    getAllUserInformations() {
        console.log('PARAM ID: ' + this.props.params.userId);

        const userId = (this.props.params.userId)
            ? this.props.params.userId
            : userInformationStore.getLoggedUserId();
        console.log('ID: ' + userId);

        const requests = [
            userService.getUser(userId),
            offerService.getOffersByUser(userId, this.state.limit, this.state.offerOffset),
            storeService.getStoresByUser(userId, this.state.limit, this.state.storeOffset)
        ];

        axios
            .all(requests)
            .then(axios.spread((userResponse, offerResponse, storeResponse) => {
                this.treatUserResponse(userResponse);
                this.treatOffersResponse(offerResponse);
                this.treatStoresResponse(storeResponse);
            }))
            .catch((error) => {
                console.log(error);
            });
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

    treatStoresResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            this.setState({stores: response.data});
            console.log(this.state.stores);
        }
        else {
            throw new Error(response.data);
        }                
    }

    render() {
        return (
            <Row>
                <UserInfoHeader user={this.state.user}/>

                <div className="container">
                    <Row>
                        <Col s={12}>
                            <h5 className="center-align">
                                Ofertas
                            </h5>

                            <OfferList offers={this.state.offers}/>
                        </Col>

                        <Col s={12}>
                            <h5 className="center-align">
                                Lojas
                            </h5>

                            <StoreList stores={this.state.stores}/>
                        </Col>
                    </Row>
                </div>
            </Row>
        )
    }
}