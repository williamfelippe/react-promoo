import React, {Component} from "react";
import {Col, Row} from "react-materialize";
import {getStoreById} from "../../services/store-service";
import {getOfferCategories, getOffersByStore} from "../../services/offer-service";
import {publishMessage} from "../../utils/messages-publisher";
import {opsInternalError} from "../../utils/strings";
import {REQUEST_SUCCESS} from "../../utils/constants";
import GoogleMapReact from "google-map-react";
import ImageWrapper from "../../components/util/image-wrapper/image-wrapper";
import OfferList from "../../components/offers/offer-list/offer-list";
import LoadMoreButton from "../../components/util/load-more-button/load-more-button";
import "./store-detail.css";

export default class StoreDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: {},
            offers: [],
            categories: [],
            limit: 30,
            offset: 0,
            center: {},
            loadingOffers: false,
            loadingStores: false,
            loadingCategories: false
        }
    }

    static defaultProps = {
        center: {
            lat: -20.377138,
            lng: -43.4363368
        },
        zoom: 15
    };

    componentDidMount() {
        const {storeId} = this.props.params;

        this.getStore(storeId);
        this.getOffers(storeId);
        this.getCategories();
    }

    getOffers(store) {
        this.setState({loadingOffers: true});

        getOffersByStore(store, this.state.limit, this.state.offset)
            .then((response) => {
                this.treatOffersResponse(response);
                this.setState({loadingOffers: false});
            })
            .catch((error) => {
                publishMessage(opsInternalError);
                this.setState({loadingOffers: false});
            })
    }

    treatOffersResponse(response) {
        const statusCode = response.status;

        if (statusCode === REQUEST_SUCCESS) {
            let offers = this.state.offers;
            this.setState({
                offers: offers.concat(response.data)
            });
        }
        else {
            throw new Error(response.data);
        }
    }

    getStore(storeId) {
        this.setState({loadingStores: true});

        getStoreById(storeId)
            .then((response) => {
                this.treatStoreResponse(response);
                this.setState({loadingStores: false});
            })
            .catch((error) => {
                publishMessage(opsInternalError);
                this.setState({loadingStores: false});
            })
    }

    treatStoreResponse(response) {
        const statusCode = response.status;

        if (statusCode === REQUEST_SUCCESS) {
            const store = response.data;

            this.setState({
                store: store,
                center: {
                    lat: store.address.latitude,
                    lng: store.address.longitude
                }
            });
        }
        else {
            throw new Error(response.data);
        }
    }

    getCategories() {
        this.setState({loadingCategories: true});

        getOfferCategories()
            .then((response) => {
                this.treatOfferCategoriesResponse(response);
                this.setState({loadingCategories: false});
            })
            .catch((error) => {
                publishMessage(opsInternalError);
                this.setState({loadingCategories: false});
            })
    }

    treatOfferCategoriesResponse(response) {
        const statusCode = response.status;

        if (statusCode === REQUEST_SUCCESS) {
            this.setState({categories: response.data});
        }
        else {
            throw new Error(response.data);
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
            styles: [
                {
                    stylers: [
                        {
                            'saturation': -65
                        }, {
                            'gamma': 0.8
                        }, {
                            'lightness': 4
                        }, {
                            'visibility': 'on'
                        }
                    ]
                }
            ]
        };

        return (
            <Row className="moo-store-detail">
                <Col s={12} className="map-wrapper">
                    <GoogleMapReact defaultCenter={this.props.center}
                                    center={this.state.center} defaultZoom={this.props.zoom}
                                    options={mapOptions}/>
                </Col>

                <Col s={12}>
                    <div className="container">
                        {
                            store.logo &&
                            <div className="store-image circle">
                                <ImageWrapper src={store.logo} alt={store.name} className="circle"/>
                            </div>
                        }

                        <div className="store-name center-align">
                            {
                                /* Nome*/
                                store.name
                            }
                        </div>

                        <div className="store-address center-align">
                            {
                                /* Endereço */
                                (store.address && store.address !== undefined) &&
                                `${store.address.street} - ${store.address.neighborhood}. ${store.address.city}`
                            }
                        </div>
                    </div>
                </Col>

                <Col s={12}>
                    <div className="container">
                        <OfferList offers={this.state.offers}/>

                        <LoadMoreButton loading={this.state.loadingOffers} onClick={this.moreOffers.bind(this)}/>
                    </div>
                </Col>
            </Row>
        )
    }
}