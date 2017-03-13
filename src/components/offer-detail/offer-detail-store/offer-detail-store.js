import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import GoogleMapReact from "google-map-react";
import Marker from "../../util/marker/marker";
import "./offer-detail-store.css";

export default class OfferDetailStore extends Component {
    static defaultProps = {
        zoom: 18
    };

    render() {
        const {store} = this.props;
        const {center} = this.props;

        const formattedAddress = `${store.address.street} - ${store.address.neighborhood}. ${store.address.city}`;

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
            <Row className="moo-offer-detail-store">
                <Col s={12}>
                    <p className="address">
                        <span className="name">{store.name}</span> ({formattedAddress})
                    </p>
                </Col>
                
                <Col s={12} className="map-wrapper">
                    <GoogleMapReact defaultCenter={center} center={center} 
                        defaultZoom={this.props.zoom} options={mapOptions}>
                            <Marker lat={center.lat} lng={center.lng} store={store} />
                    </GoogleMapReact>
                </Col>
            </Row>
        )
    }
}