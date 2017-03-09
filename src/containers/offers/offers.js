import React, {Component} from "react";
import {browserHistory} from "react-router";
import {Row, Col} from "react-materialize";
import AddBar from "../../components/system/add-bar/add-bar";
import OfferFilter from "../../components/offers/offer-filter/offer-filter";
import OfferList from "../../components/offers/offer-list/offer-list";
import Loader from "../../components/util/loader/loader";
import LoadMoreButton from "../../components/util/load-more-button/load-more-button";
import * as userInformationStore from "../../utils/user-information-store";
import * as offerService from "../../services/offer-service";
import * as messagesPublisher from "../../utils/messages-publisher";

export default class Offers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offers: [],
            categories: [],
            offset: 0,
            limit: 30,
            loadingOffers: false,
            loadingCategories: false
        };
    }

    componentDidMount() {
        this.getOffers();
        this.getOffersCategories();
    }

    getOffers() {
        this.setState({loadingOffers: true});

        offerService
            .getOffers(this.state.limit, this.state.offset)
            .then((response) => {
                this.treatOffersResponse(response);
                this.setState({loadingOffers: false});
            })
            .catch((error) => {
                console.log(error);

                messagesPublisher.showMessage(["Ops... Parece que estamos com alguns problemas"]);

                this.setState({loadingOffers: false});
            });
    }

    treatOffersResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            let offers = this.state.offers;
            this.setState({
                offers: offers.concat(response.data)
            });
        } 
        else {
            throw new Error(response.data);
        }
    }

    getOffersCategories() {
        this.setState({loadingCategories: true});

        offerService
            .getOfferCategories()
            .then((response) => {
                this.treatOfferCategoriesResponse(response);
                this.setState({loadingCategories: false});
            })
            .catch((error) => {
                console.log(error);

                messagesPublisher.showMessage(["Ops... Parece que estamos com alguns problemas"]);

                this.setState({loadingCategories: false});
            });
    }

    treatOfferCategoriesResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            this.setState({categories: response.data});
        }
        else {
            throw new Error(response.data);
        }
    }

    moreOffers() {
        this.setState({offset: this.state.limit});
        this.getOffers();
    }

    redirectToCreateOfferPage() {
        browserHistory.push((userInformationStore.isLoggedIn())
            ? 'dashboard/criar-oferta'
            : 'entrar');
    }

    render() {
        return (
            <Row className="m-b-40">
                <AddBar amount={this.state.offers.length} redirectToPage={this.redirectToCreateOfferPage}
                         buttonName="Divulgar"/>

                <Col s={12}>
                    <Row>
                        <div className="container">

                            <Col s={12} m={3}>
                                {
                                    (this.state.categories.length > 0) && 
                                    <OfferFilter categories={this.state.categories}/>
                                }

                                {
                                    /* Exibe uma imagem de "loading" */
                                    (this.state.loadingCategories) && <Loader />
                                }
                            </Col>

                            <Col s={12} m={9}>
                                {
                                    /* Listagem das ofertas */
                                    (this.state.offers.length > 0) && 
                                    <OfferList offers={this.state.offers}/>
                                }

                                {
                                    /* Permite a busca de mais ofertas ou exibe uma imagem de "loading" */
                                    <LoadMoreButton loading={this.state.loadingOffers} 
                                        onClick={this.moreOffers.bind(this)} />
                                }
                            </Col>
                        </div>
                    </Row>
                </Col>
            </Row>
        )
    }
}