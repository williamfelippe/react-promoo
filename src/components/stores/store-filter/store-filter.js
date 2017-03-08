import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete';
import * as Validator from '../../../utils/validator';

export default class StoreFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            checkedCategories: [],
            address: '',
            addressLocation: {}
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

    onChangePlace(address) {
        this.setState({address: address});
    }

    onSelectPlace() {
        const address = this.state.address;
        geocodeByAddress(address, (err, {lat, lng}) => {
            if (err) {
                console.log('Oh no!', err);
            }

            this.setState({addressLocation: {lat: lat, lng: lng}});
        });
    }

    cleanFilter() {
        this.setState = {
            name: '',
            checkedCategories: [],
            address: ''
        };

        // Descobrir como desmarcar os itens
    }

    filter() {
        this.onSelectPlace();

        const data = {
            nome: this.state.name,
            endereco: this.state.address,
            categorias: this.state.checkedCategories,
        };

        const rules = {
            nome: 'min:1',
            endereco: 'min:1',
            categorias: 'array',
        };

        const validator = Validator.validate(this.state, rules);

        if(validator.passes()) {
            console.log("It works");
        }
        else {
            //Inserir mensagem de erro
            const errors = validator.errors;
        }
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
            types: ['address'],
            componentRestrictions: {'country': 'br'}
        };

        const placeFilter =
            <PlacesAutocomplete value={this.state.address} onChange={this.onChangePlace.bind(this)}
                                options={options} placeholder="&nbsp;" hideLabel>
                <Input s={12} label="Procurar por endereço"/>
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

                <Col s={12} className="n-padding">
                    <b className="place">Endereço</b>

                    <div className="m-l-20 m-r-20">
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