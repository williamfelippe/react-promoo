import React, {Component} from "react";
import {browserHistory} from "react-router";
import {Row, Col} from "react-materialize";
import {getOffers, getOfferCategories} from "../../services/offer-service";
import {publishMessage} from "../../utils/messages-publisher";
import {REQUEST_SUCCESS} from "../../utils/constants";
import {opsInternalError} from "../../utils/strings";
import AddBar from "../../components/system/add-bar/add-bar";
import OfferFilter from "../../components/offers/offer-filter/offer-filter";
import OfferList from "../../components/offers/offer-list/offer-list";
import Loader from "../../components/util/loader/loader";
import LoadMoreButton from "../../components/util/load-more-button/load-more-button";
import NoContent from "../../components/util/no-content/no-content";

export default class Offers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offers: [],
            categories: [],
            offset: 0,
            limit: 30,
            loadingOffers: false,
            loadingCategories: false,
            query: {}
        };
    }

    componentDidMount() {
        const {search, query} = this.props.location;

        this.setState({query: query});

        this.getAllOffers((search && query) ? search : null);
        this.getAllOffersCategories();
    }

    componentWillReceiveProps(nextProps) {
        const {search, query} = nextProps.location;

        this.setState({query: query});
        if (search) {
            this.setState({
                offers: [],
                offset: 0,
                limit: 30
            });

            this.getAllOffers(search);
        }
    }

    getAllOffers(search = null) {
        this.setState({loadingOffers: true});

        getOffers(this.state.limit, this.state.offset, search)
            .then((response) => {
                this.treatOffersResponse(response);
                this.setState({loadingOffers: false});
            })
            .catch((error) => {
                publishMessage(opsInternalError);
                this.setState({loadingOffers: false});
            });
    }

    treatOffersResponse(response) {
        const statusCode = response.status;

        if (statusCode === REQUEST_SUCCESS) {
            this.setState((prevState, props) => ({
                offers: prevState.offers.concat(response.data)
            }));
        }
        else {
            throw new Error(response.data);
        }
    }

    getAllOffersCategories() {
        this.setState({loadingCategories: true});

        getOfferCategories()
            .then((response) => {
                this.treatOfferCategoriesResponse(response);
                this.setState({loadingCategories: false});
            })
            .catch((error) => {
                publishMessage(opsInternalError);
                this.setState({loadingCategories: false});
            });
    }

    treatOfferCategoriesResponse(response) {
        const statusCode = response.status;

        if (statusCode === REQUEST_SUCCESS) {
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
        browserHistory.push('dashboard/criar-oferta');
    }

    render() {
        const {
            offers,
            loadingOffers,
            categories,
            loadingCategories
        } = this.state;

        return (
            <Row className="m-b-40">
                <AddBar amount={offers.length}
                        redirectToPage={this.redirectToCreateOfferPage.bind(this)}
                        buttonName="Divulgar"/>

                <Col s={12}>
                    <Row>
                        <div className="container">
                            <Col s={12} m={3}>
                                {
                                    (categories.length > 0 && offers.length > 0) &&
                                        <OfferFilter query={this.state.query} categories={categories}/>
                                }

                                {
                                    /* Exibe uma imagem de "loading" */
                                    (loadingCategories) && <Loader />
                                }
                            </Col>

                            <Col s={12} m={9}>
                                {
                                    /* Listagem das ofertas */
                                    (offers.length > 0) && <OfferList offers={offers}/>
                                }

                                {
                                    /* Permite a busca de mais ofertas ou exibe uma imagem de "loading" */
                                    <LoadMoreButton loading={loadingOffers} onClick={this.moreOffers.bind(this)}/>
                                }
                            </Col>

                            <Col s={12}>
                                {
                                    (offers.length <= 0 && !loadingOffers) &&
                                        <NoContent message="Nenhuma oferta no momento =/"/>
                                }
                            </Col>
                        </div>
                    </Row>
                </Col>
            </Row>
        )
    }
}