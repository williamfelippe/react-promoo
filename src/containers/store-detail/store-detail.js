import React, {Component} from "react";
import GoogleMapReact from 'google-map-react';
import {Row, Col} from "react-materialize";
import axios from "axios";
import StoreMarker from "../../components/stores/store-marker/store-marker";
import OfferList from "../../components/offers/offer-list/offer-list";
import TextLoader from "../../components/util/text-loader/text-loader";
import * as storeService from "../../services/store-service";
import * as offerService from "../../services/offer-service";
import "./store-detail.css";

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

    static defaultProps = { center: {lat: 59.95, lng: 30.33}, zoom: 15};

    componentDidMount() {
        const {storeId} = this.props.params;

        this.getAllStoreInformations(storeId);
    }

    getOffers() {
        this.setState({loading: true});

        offerService.getOffers(this.state.limit, this.state.offset)
            .then((response) => {
                this.treatOffersResponse(response);
                this.setState({loading: false});
            })
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            })
    }

    getAllStoreInformations(storeId) {
        this.setState({loading: true});

        const requests = [
            storeService.getStoreById(storeId),
            offerService.getOffersByStore(storeId, this.state.limit, this.state.offset),
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
            console.log(this.state.store);
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

    moreOffers() {
        this.setState({offset: this.state.limit});
        this.getOffers();
    }

    render() {
        const {store} = this.state;

        const mapOptions = {
            panControl: false,
            mapTypeControl: false,
            scrollwheel: false,
            styles: [{ stylers: [
                { 'saturation': -60 },
                { 'gamma': 0.8 },
                { 'lightness': 4 }, 
                { 'visibility': 'on' }]
            }]
        }

        return (
            <Row className="moo-store-detail">
                <Col s={12}>
                    <div className="container">
                    </div>
                </Col>

                <Col s={12} className="map-wrapper">
                    <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom} options={mapOptions}>
                        <StoreMarker lat={store.latitude} lng={store.longitude} name={store.name}/>
                    </GoogleMapReact>
                </Col>


                <Col s={12}>
                    <div className="container">
                        <OfferList offers={this.state.offers}/>

                        <p className="center-align">
                            <TextLoader onClick={this.moreOffers.bind(this)} loading={this.state.loading}/>
                        </p>
                    </div>
                </Col>
            </Row>
        )
    }
}
