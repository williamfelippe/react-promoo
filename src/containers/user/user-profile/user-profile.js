import React, {Component} from 'react';
import {Row} from 'react-materialize';
import axios from 'axios';
import UserInfoHeader from '../../../components/user/user-info-header/user-info-header';
import * as userInformationStore from '../../../utils/user-information-store';
import * as userService from '../../../services/user-service';
import * as offerService from '../../../services/offer-service';
import * as storeService from '../../../services/store-service';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            offers: [],
            stores: [],
            limit: 10,
            storeOffset: 0,
            offerOffset: 0
        }
    }

    componentDidMount() {
        this.getAllUserInformations();
    }

    getAllUserInformations() {
        const _id = (this.props.userId) ? this.props.userId : userInformationStore.getLoggedUserId();
        console.log('ID' + _id);

        const requests = [
            userService.getUser(_id),
            offerService.getOffersByUser(_id, this.state.limit, this.state.offerOffset),
            storeService.getStoresByUser(_id, this.state.limit, this.state.storeOffset)
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
            console.log(this.state.user);
        }
    }

    treatOffersResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            this.setState({offers: response.data});
            console.log(this.state.offers);
        }
    }

    treatStoresResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            this.setState({stores: response.data});
            console.log(this.state.stores);
        }
    }

    render() {
        return (
            <Row>
                {
                    this.state.user && <UserInfoHeader user={this.state.user}/>
                }
            </Row>
        )
    }
}