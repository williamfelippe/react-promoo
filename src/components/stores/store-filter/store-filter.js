import React, {Component} from "react";
import PlacesAutocomplete, {geocodeByPlaceId} from "react-places-autocomplete";
import {Button, Col, Input, Row} from "react-materialize";
import {browserHistory} from "react-router";
import {verifyPlaceType} from "../../../utils/place-types";
import queryString from "query-string";

export default class StoreFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            category: '',
            city: '',
            address: ''
        };
    }

    componentWillReceiveProps() {
        const {name, category, city} = this.props;
        this.setState({name, category, city});
        console.log(this.state);
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    /*onChangeCheck(event) {
     let checkedCategories = this.state.checkedCategories;

     const value = event.target.value;
     const index = checkedCategories.indexOf(value);

     (index) === -1 ? checkedCategories.push(value) : checkedCategories.splice(index, 1);

     this.setState({checkedCategories: checkedCategories});
     }*/

    onChangeCategory(event) {
        this.setState({category: event.target.value});
    }

    onChangeAddress(address) {
        this.setState({address});
    }

    onSelectAddress(address, addressId) {
        console.log(`Cidade selecionada: ${address} - ${addressId}`);
        this.setState({address});

        geocodeByPlaceId(addressId, (error, {lat, lng}, results) => {
            if (error) {
                return
            }

            const location = results[0].address_components;

            location.forEach((item) => {
                const placeType = verifyPlaceType(item.types);
                if (placeType === 'city') {
                    this.setState({city: item.long_name});
                }
            });
        });
    }

    cleanFilter() {
        this.setState = {name: '', category: '', city: ''};
    }

    filter() {
        const parsed = {
            name: this.state.name,
            category: this.state.category,
            city: this.state.cityId
        };

        const query = queryString.stringify(parsed);
        const location = `${browserHistory.getCurrentLocation().pathname}?${query}`;

        browserHistory.push(location);
        //browserHistory.replace(location);
    }

    render() {
        const nameFilter =
            <Row className="n-margin-bottom">
                <Input s={12} label="Nome" onChange={this.onChangeName.bind(this)}/>
            </Row>;

        const listCategoriesFilter =
            this.props.categories.map((category) =>
                <Row key={category._id}>
                    <Input name="category" type='radio' s={12} value={category._id} label={category.name}
                           onChange={this.onChangeCategory.bind(this)}/>
                </Row>
            );

        const options = {
            types: ['(cities)'],
            componentRestrictions: {'country': 'br'}
        };

        const placeFilter =
            <PlacesAutocomplete value={this.state.city} onChange={this.onChangeAddress.bind(this)}
                                onSelect={this.onSelectAddress.bind(this)} options={options} placeholder="&nbsp;"
                                hideLabel>
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