import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete';
import './offer-filter.css';

export default class OfferFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            checkedCategories: [],
            minPrice: 0,
            maxPrice: Number.POSITIVE_INFINITY,
            address: ''
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.onChangeMinPrice = this.onChangeMinPrice.bind(this);
        this.onChangeMaxPrice = this.onChangeMaxPrice.bind(this);
        this.onChangePlace = this.onChangePlace.bind(this);
        this.cleanFilter = this.cleanFilter.bind(this);
        this.filter = this.filter.bind(this);
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeCheck(event) {
        let checkedCategories = this.state.checkedCategories;

        const value = event.target.value;
        const index = checkedCategories.indexOf(value);

        (index) === -1 ? checkedCategories.push(value) : checkedCategories.splice(index, 1);

        this.setState({checkedCategories: checkedCategories});
    }

    onChangeMinPrice() {
        this.setState({minPrice: event.target.value});
    }

    onChangeMaxPrice() {
        this.setState({maxPrice: event.target.value});
    }

    onChangePlace(address) {
        this.setState({address: address});
    }

    cleanFilter() {
        this.setState = {
            name: '',
            checkedCategories: [],
            minPrice: 0,
            maxPrice: Number.POSITIVE_INFINITY,
            address: ''
        };

        // Descobrir como desmarcar os itens
    }

    filter() {
        const address = this.state.address;
        geocodeByAddress(address, (err, {lat, lng}, results) => {
            if (err) {
                console.log('Oh no!', err);
            }

            console.log(`Yay! got latitude and longitude for ${address}`, {lat, lng});
            console.log('Entire payload from Google API', results);
        });
    }

    render() {
        const nameFilter = <Row className="n-margin-bottom">
            <Input s={12} label="Nome" onChange={this.onChangeName}/>
        </Row>;

        const listCategoriesFilter =
            this.props.categories.map((category) =>
                <Row key={category._id}>
                    <Input type='checkbox' s={12} value={category._id} label={category.name}
                           onChange={this.onChangeCheck}/>
                </Row>
            );

        const priceFilter = <Row>
            <Input s={12} m={5} type="number" label="Min" onChange={this.onChangeMinPrice} min="0" step="5"/>

            <Input s={12} m={5} type="number" label="Máx" onChange={this.onChangeMaxPrice} min="0" step="5"/>
        </Row>;

        const options = {
            types: ['address, establishment'],
            componentRestrictions: {'country': 'br'}
        };

        const placeFilter =
            <PlacesAutocomplete value={this.state.address} onChange={this.onChangePlace}
                                options={options} hideLabel>
                <Input s={12} label="Procurar por endereço" />
            </PlacesAutocomplete>;

        return (
            <Row>
                <Col s={12}>
                    <b>Nome da oferta</b>

                    {nameFilter}
                </Col>

                <Col s={12} className="m-b-20">
                    <p>
                        <b>Categorias</b>
                    </p>

                    {listCategoriesFilter}
                </Col>

                <Col s={12}>
                    <b>Preço</b>

                    {priceFilter}
                </Col>

                <Col s={12} className="n-padding">
                    <b className="place">Endereço</b>

                    {placeFilter}
                </Col>

                <Col s={12}>
                    <Button waves='light' className="w-100 m-b-20" onClick={this.filter}>
                        Filtrar
                    </Button>

                    <Button flat waves='light' className="w-100" onClick={this.cleanFilter}>
                        Limpar filtro
                    </Button>
                </Col>
            </Row>
        )
    }
}