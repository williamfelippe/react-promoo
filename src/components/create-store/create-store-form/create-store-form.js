import React, {Component} from "react";
import {Row, Col, Input, Icon, Button} from "react-materialize";
import PlacesAutocomplete, {geocodeByPlaceId} from "react-places-autocomplete";
import StreetSuggest from "../street-suggest/street-suggest";
import "./create-store-form.css";

export default class CreateStoreForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            city: '',
            cityId: '',
            address: '',
            cityLat: 0,
            cityLng: 0
        };
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeCity(city) {
        this.setState({city});
    }

    onSelectCity(city, cityId) {
        console.log(`Cidade selecionada: ${city} - ${cityId}`);
        this.setState({city, cityId});

        geocodeByPlaceId(cityId, (error, {lat, lng}, results) => {
            if (error) {
                return
            }

            this.setState({cityLat: lat, cityLng: lng});

            console.log('Geocoding success!', {lat, lng});
            console.log('Entire payload from Google API', results);
        });
    }

    onChangeAddress(address) {
        this.setState({address});
    }

    onSelectAddress(address, addressId) {
        console.log(`Endereço selecionado: ${address} - ${addressId}`);
        this.setState({address, addressId});

        geocodeByPlaceId(addressId, (error, {lat, lng}, results) => {
            if (error) {
                return
            }

            console.log(results);
        });
    }

    submit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        const options = {
            types: ['(cities)'],
            componentRestrictions: {'country': 'br'}
        };

        return (
            <Row className="moo-create-store">
                <form onSubmit={this.submit.bind(this)} className="col s12">
                    <Row>
                        <Col s={12} className="n-padding">
                            <p className="icon">
                                <Icon>store</Icon>
                            </p>

                            <Input s={12} type="text" label="Nome da loja" onChange={this.onChangeName.bind(this)}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col s={12} className="n-padding">
                            <p className="icon">
                                <Icon>place</Icon>
                            </p>

                            <p className="help">
                                Conte-nos em qual cidade você encontrou essa promoção
                            </p>

                            <div className="place-filter">
                                <PlacesAutocomplete
                                    value={this.state.city}
                                    onChange={this.onChangeCity.bind(this)}
                                    onSelect={this.onSelectCity.bind(this)} options={options}
                                    placeholder="&nbsp;" hideLabel>
                                    <Input s={12} label="Procurar por endereço" className="m-l-20 m-r-20"/>
                                </PlacesAutocomplete>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col s={12}>
                            {
                                (this.state.cityLng !== 0 && this.state.cityLat !== 0) &&
                                <StreetSuggest
                                    address={this.state.address}
                                    onChangeAddress={this.onChangeAddress.bind(this)}
                                    onSelectAddress={this.onSelectAddress.bind(this)}
                                    lat={this.state.cityLat} lng={this.state.cityLng}/>
                            }
                        </Col>
                    </Row>

                    <Row>
                        <Col s={12}>
                            <Button waves="light" type="submit" className="right">
                                Indicar
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Row>
        )
    }
}