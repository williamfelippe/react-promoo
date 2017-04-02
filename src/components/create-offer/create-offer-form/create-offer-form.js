import React, {Component} from "react";
import {Button, Col, Icon, Input, Row} from "react-materialize";
import PlacesAutocomplete, {geocodeByPlaceId} from "react-places-autocomplete";
import {browserHistory} from "react-router";
import {validate} from "../../../utils/validator";
import {getOfferCategories, postOffer} from "../../../services/offer-service";
import {getStoresByCity} from "../../../services/store-service";
import {formatCurrency} from "../../../utils/currency-format";
import {publishMessage} from "../../../utils/messages-publisher";
import {clearUserStore, getLoggedUser, getLoggedUserId} from "../../../utils/user-information-store";
import {expiredSessionError, opsInternalError, thanksForHelpSuccess} from "../../../utils/strings";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../../utils/constants";
import Loader from "../../util/loader/loader";
import StoreSuggest from "../../create-offer/store-suggest/store-suggest";
import "./create-offer-form.css";

export default class CreateOfferForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            brand: '',
            price: 0,
            category: '',
            city: '',
            cityId: '',
            store: '',
            description: '',

            offerCategories: [],
            stores: [],

            loadingSubmit: false,
            loadingCategories: false,
            loadingStores: false
        };

        console.log(getLoggedUser());
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

                if (status === REQUEST_SUCCESS) {
                    this.setState({offerCategories: response.data})
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loadingCategories: false});
            })
            .catch((error) => {
                console.log(error);
                publishMessage(opsInternalError);

                this.setState({loadingCategories: false});
            });
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeBrand(event) {
        this.setState({brand: event.target.value});
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

    onSelectCity(city, cityId) {
        this.setState({city, cityId, loadingStores: true});
        console.log(`PlaceId ${cityId}`);

        geocodeByPlaceId(cityId, (error, {lat, lng}, results) => {
            if (error) {
                return
            }

            const location = results[0].address_components;

            getStoresByCity(location[0].long_name)
                .then((response) => {
                    const statusCode = response.status;

                    if (statusCode === REQUEST_SUCCESS) {
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
                    publishMessage(opsInternalError);

                    this.setState({loadingStores: false});
                });
        });
    }

    onChangeStore(event) {
        this.setState({store: event.target.value});
        console.log(`Loja: ${this.state.store}`);
    }

    onChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    submit(event) {
        event.preventDefault();

        console.log(this.state);

        const data = {
            nome: this.state.name,
            valor: this.state.price,
            categoria: this.state.category,
            loja: this.state.store
        };

        const rules = {
            nome: 'required',
            valor: 'required|numeric',
            categoria: 'required',
            loja: 'required'
        };

        const validator = validate(data, rules);

        if (validator.passes()) {
            this.divulgeOffer({
                name: this.state.name,
                brand: this.state.brand,
                price: this.state.price,
                category: this.state.category,
                store: this.state.store,
                user: getLoggedUserId(),
                description: this.state.description
            });
        }
        else {
            const errors = validator.errors;

            console.log("CREATE OFFER ERROR");
            console.log(errors);

            publishMessage(
                ...errors.get('nome'),
                ...errors.get('valor'),
                ...errors.get('categoria'),
                ...errors.get('loja')
            );
        }
    }

    divulgeOffer(data) {
        this.setState({loadingSubmit: true});

        console.log(data);

        postOffer(data)
            .then((response) => {
                console.log(response);

                const statusCode = response.status;

                if (statusCode === REQUEST_SUCCESS) {
                    publishMessage(thanksForHelpSuccess);
                    browserHistory.push('dashboard/ofertas');
                }
                else {
                    throw new Error(response.data);
                }
            })
            .catch((error) => {
                console.log(error);

                const status = error.response.status;
                console.log(status);
                if (status && status === UNAUTHORIZED) {
                    publishMessage(expiredSessionError);

                    clearUserStore();
                    browserHistory.push('/');
                }
                else {
                    publishMessage(opsInternalError);
                    this.setState({loadingSubmit: false});
                }
            });
    }

    render() {
        const options = {
            types: ['(cities)'],
            componentRestrictions: {'country': 'br'}
        };

        const listCategories = this.state.offerCategories.map((offerCategory) =>
            <option value={offerCategory._id} key={offerCategory._id}>
                {offerCategory.name}
            </option>
        );

        const storeSuggest = (this.state.loadingStores)
            ? <Loader />
            : <StoreSuggest stores={this.state.stores} onChangeStore={this.onChangeStore.bind(this)}/>;

        const submitButton = (this.state.loadingSubmit)
            ? <Loader />
            : <Button waves="light" type="submit" className="right">Divulgar</Button>;

        return (
            <Row className="moo-create-offer">
                <form onSubmit={this.submit.bind(this)} className="col s12">
                    <Row>
                        { /* Nome do produto */ }
                        <Col s={12} className="n-padding">
                            <p className="icon">
                                <Icon>local_offer</Icon>
                            </p>

                            <Input s={12} type="text" label="Qual o produto?" onChange={this.onChangeName.bind(this)}/>
                        </Col>
                    </Row>

                    <Row>
                        <Input s={12} type="text" label="De qual marca?" onChange={this.onChangeBrand.bind(this)}/>
                    </Row>

                    <Row>
                        {
                            /* Categoria do produto */
                            (this.state.loadingCategories) ?
                                <Loader /> :
                                <Input s={12} type="select" defaultValue="" label="Escolha uma categoria"
                                       onChange={this.onChangeOfferCategory.bind(this)}>
                                    <option value="" disabled>Escolhe uma aí =)</option>
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
                                {formatCurrency(this.state.price)}
                            </p>

                            <p className="help">
                                Escolha o preço do produto, digitando o valor ou, se estiver no computador, usando as
                                setas do teclado
                            </p>
                            <Input s={12} value={this.state.price} type="number" min="0" max="10000" step="0.01"
                                   onChange={this.onChangePrice.bind(this)}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col s={12} className="n-padding">
                            <p className="icon">
                                <Icon>pin_drop</Icon>
                            </p>

                            <p className="help">
                                Conte-nos em qual cidade você encontrou essa promoção
                            </p>

                            <div className="place-filter">
                                <PlacesAutocomplete
                                    value={this.state.city} onChange={this.onChangeCity.bind(this)}
                                    onSelect={this.onSelectCity.bind(this)} options={options}
                                    placeholder="&nbsp;" hideLabel>
                                    <Input s={12} label="Procurar por endereço"/>
                                </PlacesAutocomplete>
                            </div>
                        </Col>
                    </Row>

                    {
                        /* Loja */
                        this.state.city && storeSuggest
                    }

                    <Row>
                        { /* Descrição do produto */ }
                        <Input s={12}
                               type="textarea"
                               label="Algo mais a nos dizer sobre esse produto?"
                               onChange={this.onChangeDescription.bind(this)}/>
                    </Row>

                    <Row>
                        <Col s={12}>
                            {submitButton}
                        </Col>
                    </Row>
                </form>
            </Row>
        )
    }
}