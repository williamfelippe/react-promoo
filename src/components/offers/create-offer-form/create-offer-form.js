import React, {Component} from 'react';
import {Row, Input, Button} from 'react-materialize';
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete';

export default class CreateOfferForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: 0,
            category: null,
            address: '',
            store: null,
            description: '',
            offerCategories: [],
            stores: []
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeOfferCategory = this.onChangeOfferCategory.bind(this);
        this.onChangePlace = this.onChangePlace.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangePrice(event) {
        this.setState({price: event.target.value});
    }

    onChangeOfferCategory(event) {
        this.setState({category: event.target.value});
    }

    onChangePlace(address) {
        this.setState({address: address});
    }

    onChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    submit(event) {
        event.preventDefault();

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
        const listCategories = this.state.offerCategories.map((offerCategory) =>
            <option value={offerCategory._id}>
                {offerCategory.name}
            </option>
        );

        const options = {
            types: ['address'],
            componentRestrictions: {'country': 'br'}
        };

        return (
            <form onSubmit={this.submit} className="col s12 m8 offset-m2">
                <Row>
                    <Input s={12} label="Nome do produto" onChange={this.onChangeName} />
                </Row>

                <Row>
                    <Input s={12} type="number" label="Preço" onChange={this.onChangePrice} min="0" step="0.01" />
                </Row>

                <Row>
                    <Input s={12} type="select" label="Categoria" onChange={this.onChangeOfferCategory}>
                        {listCategories}
                    </Input>
                </Row>

                <Row>
                    { /* Endereço da loja */ }
                    <PlacesAutocomplete value={this.state.address} onChange={this.onChangePlace} options={options}>
                        <Input s={12} label="Onde fica a loja?"/>
                    </PlacesAutocomplete>
                </Row>

                <Row>
                    {/*
                    <div className="input-field col s12">
                        <select disabled md-select value.bind="store">
                            <option disabled>Escolha uma loja</option>
                            <option repeat.for="storeItem of stores" model.bind="storeItem._id">
                                ${storeItem.name}
                            </option>
                        </select>
                        <label>Loja</label>
                    </div>
                    */ }
                </Row>

                <Row>
                    <Input s={12} type="textarea" label="Descrição" onChange={this.onChangeDescription}/>
                </Row>

                <Button type="submit" waves="light">
                    Salvar
                </Button>
            </form>
        )
    }
}