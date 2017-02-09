import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete';
import * as offerService from '../../../services/offer-service';

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
            stores: [],
            storeNotFound: false,
            placeType: 'establishment'
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeOfferCategory = this.onChangeOfferCategory.bind(this);
        this.onChangePlace = this.onChangePlace.bind(this);
        this.onChangeStore = this.onChangeStore.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.storeNotFound = this.storeNotFound.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.getOfferCategories();
    }

    getOfferCategories() {
        offerService.getOfferCategories()
            .then((response) => {
                console.log(response);
                const status = response.status;

                (status === 200)
                    ? this.setState({offerCategories: response.data})
                    : this.treatOfferCategoriesError(status);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    treatOfferCategoriesError(status) {
        console.log(status);
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

    onChangeStore(event) {
        this.setState({store: event.target.value});
    }

    onChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    storeNotFound() {
        this.setState({storeNotFound: true, placeType: 'address'});
    }

    submit(event) {
        event.preventDefault();

        const {address} = this.state;
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
            <option value={offerCategory._id} key={offerCategory._id}>
                {offerCategory.name}
            </option>
        );

        const listStores = this.state.stores.map((store) =>
            <option value={store._id} key={store._id}>
                {store.name}
            </option>
        );

        const options = {
            types: [this.state.placeType],
            componentRestrictions: {'country': 'br'}
        };

        return (
            <form onSubmit={this.submit} className="col s12">
                <Row>
                    { /* Endereço da loja */ }
                    <PlacesAutocomplete value={this.state.address} onChange={this.onChangePlace} options={options}
                                        hideLabel>
                        <Input s={12} label="Onde fica a loja?"/>
                    </PlacesAutocomplete>
                </Row>

                <Row className={ !this.state.storeNotFound ? 'hide' : ''}>
                    <Col s={12}>
                        <Row>
                            <Input s={12} type="select" label="Categoria" onChange={this.onChangeOfferCategory}>
                                {listCategories}
                            </Input>
                        </Row>

                        <Row>
                            <Input s={8} label="Nome do produto" onChange={this.onChangeName}/>

                            <Input s={4} type="number" label="Preço" onChange={this.onChangePrice} min="0"
                                   step="0.01"/>
                        </Row>

                        <Row>
                            <Input s={12} type="select" label="Loja" onChange={this.onChangeStore}>
                                {listStores}
                            </Input>
                        </Row>

                        <Row>
                            <Input s={12} type="textarea" label="Descrição" onChange={this.onChangeDescription}/>
                        </Row>
                    </Col>
                </Row>

                <Row className="center-align">
                    {
                        !this.state.storeNotFound &&
                        <Button onClick={this.storeNotFound} flat waves="light" className="m-r-20">
                            Não encontrei a loja
                        </Button>
                    }

                    <Button type="submit" waves="light" className={this.state.storeNotFound ? 'w-100' : ''}>
                        Salvar
                    </Button>
                </Row>
            </form>
        )
    }
}