import React, {Component} from "react";
import {Row} from "react-materialize";
import axios from "axios";
import OfferList from "../../components/offers/offer-list/offer-list";
import * as storeService from "../../services/store-service";
import * as offerService from "../../services/offer-service";

export default class StoreDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: {},
            offers: [],
            categories: [],
            limit: 30,
            offset: 0
        }
    }

    componentDidMount() {
        const {storeId} = this.props.params;

        if (Number.isInteger(storeId)) {
            this.getAllStoreInformations(storeId);
        }
        else {
            //Redirect to unknown route
        }
    }

    getAllStoreInformations(storeId) {
        this.setState({loading: true});

        const requests = [
            storeService.getStoreById(storeId),
            offerService.getOffersByStore(this.state.limit, this.state.offset),
            offerService.getOfferCategories()
        ];

        axios
            .all(requests)
            .then(axios.spread((storeResponse, offerResponse, categoryResponse) => {
                this.treatStoreResponse(storeResponse);
                this.treatOffersResponse(offerResponse);
                this.treatOfferCategoriesResponse(categoryResponse);

                this.setState({loading: false});
            }))
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    treatStoreResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            this.setState({store: response.data});
        }
        else {
        }
    }

    treatOffersResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            let offers = this.state.offers;
            this.setState({offers: offers.concat(response.data)});
        }
        else {
        }
    }

    treatOfferCategoriesResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            this.setState({categories: response.data});
        }
        else {
        }
    }

    render() {
        return (
            <Row>
                <OfferList offers={this.state.offers} />
            </Row>
        )
    }
}
