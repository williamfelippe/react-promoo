import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import {browserHistory} from "react-router";
import queryString from "query-string";
import PlacesAutocomplete from 'react-places-autocomplete';

export default class StoreFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            checkedCategories: [],
            city: '',
            cityId: ''
        };
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

    onChangeCity(city) {
        this.setState({city});
    }

    onSelectCity(city, cityId) {
        this.setState({ city, cityId });
    }

    cleanFilter() {
        this.setState = {
            name: '',
            checkedCategories: [],
            city: ''
        };

        // Descobrir como desmarcar os itens
    }

    filter() {
        const parsed = {
            name: this.state.name,
            checkedCategories: this.state.checkedCategories,
            city: this.state.cityId
        };

        const query = queryString.stringify(parsed);
        const location = `${browserHistory.getCurrentLocation().pathname}?${query}`;
        browserHistory.push(location);
    }

    render() {
        const nameFilter =
            <Row className="n-margin-bottom">
                <Input s={12} label="Nome" onChange={this.onChangeName.bind(this)}/>
            </Row>;

        const listCategoriesFilter =
            this.props.categories.map((category) =>
                <Row key={category._id}>
                    <Input type='checkbox' s={12} value={category._id} label={category.name}
                           onChange={this.onChangeCheck.bind(this)}/>
                </Row>
            );

        const options = {
            types: ['(cities)'],
            componentRestrictions: {'country': 'br'}
        };

        const placeFilter =
            <PlacesAutocomplete value={this.state.city} onChange={this.onChangeCity.bind(this)}
                onSelect={this.onSelectCity.bind(this)} options={options} placeholder="&nbsp;" hideLabel>
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