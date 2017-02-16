import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import axios from "axios";
import {browserHistory} from "react-router";
import AddBar from "../../components/system/add-bar/add-bar";
import OfferFilter from "../../components/offers/offer-filter/offer-filter";
import OfferList from "../../components/offers/offer-list/offer-list";
import Loader from "../../components/util/loader/loader";
import * as userInformationStore from "../../utils/user-information-store";
import * as offerService from "../../services/offer-service";

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
    }

    componentDidMount() {
        this.getOffersAndCategories();
    }

    getOffers() {
        this.setState({loading: true});

        offerService.getOffers(this.state.limit, this.state.offset)
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
            let offers = this.state.offers;
            this.setState({offers: offers.concat(response.data)});

            console.log("OFERTAS: " + this.state.offers);
        }
        else {
        }
    }

    treatOfferCategoriesResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            this.setState({categories: response.data});
        }
        else {
        }
    }

    moreOffers() {
        this.setState({offset: this.state.limit});
        this.getOffers();
    }

    redirectToCreateOfferPage() {
        browserHistory.push((userInformationStore.isLoggedIn())
            ? 'dashboard/create-offer'
            : 'signin');
    }

    render() {
        return (
            <Row className="m-b-40">
                <AddBar amount={this.state.offers.length} redirectToPage={this.redirectToCreateOfferPage}
                        buttonName="Divulgar"/>

                {
                    (this.state.offers.length && this.state.categories.length) &&
                    <Col s={12}>
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
                                            <Loader onClick={this.moreOffers.bind(this)} loading={this.state.loading}/>
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