import React, {Component} from "react";
import PlacesAutocomplete, {geocodeByPlaceId} from "react-places-autocomplete";
import {Row, Col, Input, Button} from "react-materialize";
import {browserHistory} from "react-router";
import {verifyPlaceType} from "../../../utils/place-types";
import {MAX_PRICE_VALUE} from "../../../utils/constants";
import queryString from "query-string";
import "./offer-filter.css";

export default class OfferFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            checkedCategories: [],
            category: '',
            minPrice: 0,
            maxPrice: 0,
            address: '',
            city: ''
        };
    }

    componentWillReceiveProps() {
        const {query} = this.props;

        const name = (query.name && query.name !== undefined) ? query.name : '';
        const category = (query.category && query.category !== undefined) ? query.category : '';
        const city = (query.city && query.city !== undefined) ? query.city : '';

        const {minPrice, maxPrice} = query;

        this.setState({name, category, minPrice, maxPrice, city, address: ''});
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeCategory(event) {
        console.log(event.target.value);
        this.setState({category: event.target.value});
    }

    onChangeMinPrice(event) {
        this.setState({minPrice: event.target.value});
    }

    onChangeMaxPrice(event) {
        this.setState({maxPrice: event.target.value});
    }

    onChangeAddress(address) {
        this.setState({address});
    }

    onSelectAddress(address, addressId) {
        console.log(`Cidade selecionada: ${address} - ${addressId}`);
        this.setState({address});

        //noinspection JSUnusedLocalSymbols
        geocodeByPlaceId(addressId, (error, {lat, lng}, results) => {
            if (error) {
                return
            }

            //noinspection JSUnresolvedVariable
            const location = results[0].address_components;

            location.forEach((item) => {
                const placeType = verifyPlaceType(item.types);
                if(placeType === 'city') {
                    //noinspection JSUnresolvedVariable
                    this.setState({city: item.long_name});
                }
            });
        });
    }

    filter() {
        const parsed = {
            name: this.state.name,
            category: this.state.category,
            minPrice: this.state.minPrice,
            maxPrice: this.state.maxPrice,
            city: this.state.cityId
        };

        const query = queryString.stringify(parsed);
        const location = `${browserHistory.getCurrentLocation().pathname}?${query}`;

        browserHistory.push(location);
    }

    cleanFilter() {
        this.setState = { name: '', category: '', minPrice: 0, maxPrice: MAX_PRICE_VALUE, city: '', address: '' };
        browserHistory.push('dashboard/ofertas');
    }

    render() {
        const nameFilter =
            <Row className="n-margin-bottom">
                <Input s={12} label="Nome" defaultValue={this.state.name} onChange={this.onChangeName.bind(this)}/>
            </Row>;

        const listCategoriesFilter =
            this.props.categories.map((category) =>
                <Row key={category._id}>
                    <Input name="category" type="radio" s={12} value={category._id} label={category.name}
                           onChange={this.onChangeCategory.bind(this)}/>
                </Row>
            );

        const priceFilter =
            <Row>
                <Input s={12} m={5} type="number" defaultValue={this.state.minPrice} label="Min" onChange={this.onChangeMinPrice.bind(this)} min="0"
                       step="5"/>

                <Input s={12} m={5} type="number" defaultValue={this.state.minPrice} label="Máx" onChange={this.onChangeMaxPrice.bind(this)} min={this.state.minPrice}
                       step="5"/>
            </Row>;

        const options = {
            types: ['(cities)'],
            componentRestrictions: {'country': 'br'}
        };

        const placeFilter =
            <PlacesAutocomplete value={this.state.address} onChange={this.onChangeAddress.bind(this)}
                onSelect={this.onSelectAddress.bind(this)} options={options} placeholder="&nbsp;" hideLabel>
                <Input s={12} label="Procurar por endereço"/>
            </PlacesAutocomplete>;

        return (
            <Row>
                <Col s={12}>
                    <strong>Nome da oferta</strong>

                    {nameFilter}
                </Col>

                <Col s={12} className="m-b-20">
                    <p>
                        <strong>Categorias</strong>
                    </p>

                    {listCategoriesFilter}
                </Col>

                <Col s={12}>
                    <strong>Preço</strong>

                    {priceFilter}
                </Col>

                <Col s={12} className="n-padding">
                    <strong className="place">Cidade</strong>

                    <div className="place-filter">
                        {placeFilter}
                    </div>
                </Col>

                <Col s={12}>
                    <Button waves='light' className="w-100 m-b-20" onClick={this.filter.bind(this)}>
                        Filtrar
                    </Button>

                    <Button flat waves='light' className="w-100" onClick={this.cleanFilter.bind(this)}>
                        Limpar filtro
                    </Button>
                </Col>
            </Row>
        )
    }
}