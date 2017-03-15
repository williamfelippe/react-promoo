import React, {Component} from "react";
import {Row, Col, Input, Button} from "react-materialize";
import PlacesAutocomplete from 'react-places-autocomplete';
import {getOfferCategories} from "../../../services/offer-service";
import {getStoresByCity} from "../../../services/store-service";
import Loader from "../../util/loader/loader";
import StoreSuggest from "../../create-offer/store-suggest/store-suggest";
import * as currencyFormat from "../../../utils/currency-format";
import * as messagesPublisher from "../../../utils/messages-publisher";
import "./create-offer-form.css";

export default class CreateOfferForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: 0,
            category: {},
            city: '',
            cityId: '',
            store: {},
            description: '',

            offerCategories: [],
            stores: [],

            loadingCategories: false,
            loadingStores: false
        };
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        this.setState({loadingCategories: true});

        getOfferCategories()
            .then((response) => {
                console.log(response);
                const status = response.status;

                if(status === 200) {
                    this.setState({offerCategories: response.data})
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loadingCategories: false});
            })
            .catch((error) => {
                console.log(error);
                messagesPublisher.showMessage("Ops... Parece que estamos com alguns problemas");

                this.setState({loadingCategories: false});
            });
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

    onChangeCity(city) {
        this.setState({city: city});
    }

    onSelectCity(address, placeId) {
        this.setState({ city: address, cityId: placeId, loadingStores: true});

        console.log(`PlaceId ${placeId}`);

        getStoresByCity(placeId)
            .then((response) => {
                const statusCode = response.status;

                if(statusCode === 200) {
                    console.log(response.data);
                    this.setState({stores: response.data});
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loadingStores: false});
            })
            .catch((error) => {
                console.log(error);
                messagesPublisher.showMessage("Ops... Parece que estamos com alguns problemas");

                this.setState({loadingStores: false});
            });
    }

    onChangeStore(event) {
        this.setState({store: event.target.value});
    }

    onChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    submit(event) {
        event.preventDefault();

        console.log(this.state);
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
            types: ['(cities)'],
            componentRestrictions: {'country': 'br'}
        };

        const storeSuggest = (this.state.loadingStores) 
            ? <Loader /> 
            : <StoreSuggest listStores={listStores} onChangeStore={this.onChangeStore} />;

        return (
            <Row className="moo-create-offer">
                <form onSubmit={this.submit.bind(this)} className="col s12">
                    <Row>
                        { /* Nome do produto */ }
                        <Input s={12} type="text" label="Qual o produto?" onChange={this.onChangeName.bind(this)} />
                    </Row>

                    <Row>
                        {
                            /* Categoria do produto */
                            (this.state.loadingCategories) ?
                            <Loader /> :
                            <Input s={12} type="select" label="Escolha uma categoria" onChange={this.onChangeOfferCategory.bind(this)}>
                                {listCategories}
                            </Input>
                        }
                     </Row>

                     <Row>
                        {/* Preço */}

                        <Col s={12} className="n-padding">
                            <p className="title">
                                Qual o preço?
                            </p>
                            <p className="price">
                                {currencyFormat.format(this.state.price)}
                            </p>

                            <p className="price-help">
                                Escolha o preço do produto, digitando o valor ou, se estiver no computador, usando as setas do teclado
                            </p>
                            <Input s={12} value={this.state.price} type="number" min="0" max="10000" step="0.01" onChange={this.onChangePrice.bind(this)} />
                        </Col>
                    </Row>

                    <Row>
                        <Col s={12} className="n-padding">
                            <b className="place">Cidade</b>

                            <div className="place-filter">
                                <PlacesAutocomplete value={this.state.city} onChange={this.onChangeCity.bind(this)}
                                        onSelect={this.onSelectCity.bind(this)} options={options} placeholder="&nbsp;" hideLabel>
                                    <Input s={12} label="Procurar por endereço"/>
                                </PlacesAutocomplete>
                            </div>
                        </Col>
                    </Row>

                    {
                        /* Loja */
                        this.state.city && {storeSuggest}
                    }

                    <Row>
                        { /* Descrição do produto */ }
                        <Input s={12} type="textarea" label="Algo mais a nos dizer sobre esse produto?"
                            onChange={this.onChangeDescription.bind(this)}/>
                    </Row>

                    <Row>
                        <Col s={12}>
                            <Button waves="light" type="submit" className="right">
                                Divulgar
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Row>

        )
    }
}