import React, {Component} from "react";
import {Row, Col, Input, Button} from "react-materialize";
//import PlacesAutocomplete, {geocodeByAddress} from "react-places-autocomplete";
import {getOfferCategories} from "../../../services/offer-service";
import * as currencyFormat from "../../../utils/currency-format";
import "./create-offer-form.css";

export default class CreateOfferForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: 0,
            category: {},
            address: '',
            store: {},
            description: '',
            offerCategories: [],
            stores: [],
            storeNotFound: false,
            placeType: 'establishment'
        };
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        getOfferCategories()
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
        console.log("ué");
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
        /*geocodeByAddress(address, (err, {lat, lng}, results) => {
            if (err) {
                console.log('Oh no!', err);
            }

            console.log(`Yay! got latitude and longitude for ${address}`, {lat, lng});
            console.log('Entire payload from Google API', results);
        });*/
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
            <Row className="moo-create-offer">
                <form onSubmit={this.submit.bind(this)} className="col s12">
                    { /* Nome do produto */ }
                    <Input s={12} type="text" label="Qual o produto?" onChange={this.onChangeName.bind(this)} />

                    {/* Preço */}
                    <Col s={12}>
                        <p className="price">
                            {currencyFormat.format(this.state.price)}
                        </p>
                        <p className="range-field">
                            <input type="range" min="0" max="100" step="0.1" onChange={this.onChangePrice.bind(this)} />
                        </p>
                    </Col>

                    { /* Descrição do produto */ }
                    <Input s={12} type="textarea" label="Algo mais a nos dizer sobre esse produto?"
                           onChange={this.onChangeDescription.bind(this)}/>

                    <Col s={12}>
                        <Button waves="light" type="submit">
                            Divulgar
                        </Button>
                    </Col>
                </form>
            </Row>

        )
    }
}