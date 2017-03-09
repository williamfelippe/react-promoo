import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import GoogleMapReact from "google-map-react";
import Loader from "../../components/util/loader/loader";
import * as offerService from "../../services/offer-service";
import * as messagesPublisher from "../../utils/messages-publisher";
import "./offer-detail.css";

export default class OfferDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offer: {},
            center: {},
            loadingOffer: false,
            loadingComments: false
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
        const {offerId} = this.props.params;
        this.getOffer(offerId);
    }

    getOffer(offerId) {
        this.setState({loadingOffer: true});

        offerService.getOfferById(offerId)
            .then((response) => {
                this.treatOfferResponse(response);
                this.setState({loadingOffer: false});
            })
            .catch((error) => {
                console.log(error);

                messagesPublisher.showMessage(["Ops... Parece que estamos com alguns problemas"]);
                this.setState({loadingOffer: false});
            })
    }

    treatOfferResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            const offer = response.data;
            this.setState({ 
                offer: offer,
                center: {
                    lat: offer.store.address.latitude,
                    lng: offer.store.address.longitude
                }
             });
        } 
        else {
            throw new Error(response.data);
        }
    }

    render() {
        const {offer} = this.state;

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
            <Row>
                <Col s={12}>
                    <div className="container">
                        {/* Categoria */}

                        {/* Nome */}

                        {/* Preço */}
                    </div>
                </Col>

                <Col s={12} className="n-padding">
                    <GoogleMapReact defaultCenter={this.props.center}
                        center={this.state.center} defaultZoom={this.props.zoom}
                        options={mapOptions} />
                </Col>

                <Loader />
            </Row>
        );
    }
}