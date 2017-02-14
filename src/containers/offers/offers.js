import React, {Component} from 'react';
import {Row, Col, Button, Dropdown} from 'react-materialize';
import {browserHistory} from 'react-router';
import axios from 'axios';
import OfferFilter from '../../components/offers/offer-filter/offer-filter';
import OfferList from '../../components/offers/offer-list/offer-list';
import Loader from '../../components/util/loader/loader';
import * as userInformationStore from '../../utils/user-information-store';
import * as offerService from '../../services/offer-service';

export default class Offers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offers: [],
            categories: [],
            offset: 0,
            limit: 30,
            loading: false
        };

        this.moreOffers = this
            .moreOffers
            .bind(this);
        this.redirectToCreateOffer = this
            .redirectToCreateOffer
            .bind(this);
    }

    componentDidMount() {
        this.getOffersAndCategories();
    }

    getOffers() {
        this.setState({loading: true});

        offerService
            .getOffers(this.state.limit, this.state.offset)
            .then((response) => {
                this.treatOffersResponse(response);
                this.setState({loading: false});
            })
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            })
    }

    getOffersAndCategories() {
        this.setState({loading: true});

        const requests = [
            offerService.getOffers(this.state.limit, this.state.offset),
            offerService.getOfferCategories()
        ];

        axios
            .all(requests)
            .then(axios.spread((offerResponse, categoryResponse) => {
                this.treatOffersResponse(offerResponse);
                this.treatOfferCategoriesResponse(categoryResponse);

                this.setState({loading: false});
            }))
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    treatOffersResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            console.log('Ofertas');
            console.log(response.data);

            let offers = this.state.offers;
            console.log(offers);

            response
                .data
                .forEach((item) => {
                    offers.push(item);
                });

            console.log(offers);

            this.setState({offers: offers});
        } else {}
    }

    treatOfferCategoriesResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            console.log('Categorias de Ofertas');
            console.log(response.data);

            this.setState({categories: response.data});
        } else {}
    }

    moreOffers() {
        this.setState({offset: this.state.limit});
        this.getOffers();
    }

    redirectToCreateOffer() {
        browserHistory.push((userInformationStore.isLoggedIn())
            ? 'dashboard/create-offer'
            : 'signin');
    }

    render() {
        return (
            <Row className="m-b-40">
                <Col s={12} className="n-padding">
                    <Row className="moo-add-bar">
                        <div className="container">
                            <Col s={6}>
                                <p>
                                    <b>
                                        {this.state.offers.length}
                                        ofertas encontradas
                                    </b>
                                </p>
                            </Col>
                            <Col s={6} className="right-align">
                                <p>
                                    <Button onClick={this.redirectToCreateOffer} waves='light'>
                                        Divulgar
                                    </Button>
                                    <Dropdown trigger={<Button flat waves="light">Ordenar</Button>}>
                                        <NavItem>Nome</NavItem>
                                        <NavItem>Categoria</NavItem>
                                        <NavItem>Preço</NavItem>
                                    </Dropdown>;
                                </p>
                            </Col>
                        </div>
                    </Row>
                </Col>

                {(this.state.offers.length && this.state.categories.length) && <Col s={12}>
                    <Row>
                        <div className="container">
                            <Col s={12} m={3}>
                                <OfferFilter categories={this.state.categories}/>
                            </Col>

                            <Col s={12} m={9}>
                                <Row>
                                    {/* Listagem das ofertas */}
                                    <OfferList offers={this.state.offers}/>
                                </Row>

                                <Row>
                                    {/* Permite a busca de mais ofertas */}
                                    <p className="center-align">
                                        <Loader onClick={this.moreOffers} loading={this.state.loading}/>
                                    </p>
                                </Row>
                            </Col>
                        </div>
                    </Row>
                </Col>
}
            </Row>
        )
    }
}