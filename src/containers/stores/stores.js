import React, {Component} from "react";
import _ from 'lodash';
import {Row, Col, Button} from "react-materialize";
import axios from "axios";
import {browserHistory} from 'react-router';
import StoreList from "../../components/stores/store-list/store-list";
import Loader from "../../components/util/loader/loader";
import * as userInformationStore from '../../utils/user-information-store';
import * as storeService from "../../services/store-service";

export default class Stores extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: [],
            categories: [],
            limit: 30,
            offset: 0,
            loading: false,
            sortBy: ''
        };

        this.moreStores = this.moreStores.bind(this);
        this.redirectToCreateOffer = this.redirectToCreateOffer.bind(this);
        this.sortStores = this.sortStores.bind(this);
    }

    componentDidMount() {
        this.getStoresAndCategories();
    }

    getStores() {
        this.setState({loading: true});

        storeService.getStores(this.state.limit, this.state.offset)
            .then((response) => {
                this.treatStoresResponse(response);
                this.setState({loading: false});
            })
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            })
    }

    getStoresAndCategories() {
        this.setState({loading: true});

        const requests = [
            storeService.getStores(this.state.limit, this.state.offset),
            storeService.getStoreCategories()
        ];

        axios
            .all(requests)
            .then(axios.spread((storeResponse, categoryResponse) => {
                this.treatStoresResponse(storeResponse);
                this.treatStoreCategoriesResponse(categoryResponse);

                this.setState({loading: false});
            }))
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    treatStoresResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            console.log('Lojas');
            console.log(response.data);

            let stores = this.state.stores;
            response.data.forEach((item) => {
                stores.push(item);
            });

            this.setState({stores: stores});
        }
        else {

        }
    }

    treatStoreCategoriesResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            console.log('Categorias de Ofertas');
            console.log(response.data);

            this.setState({categories: response.data});
        }
        else {

        }
    }

    moreStores() {
        this.setState({ offset: this.state.limit });
        this.getStores();
    }

    redirectToCreateOffer() {
        browserHistory.push((userInformationStore.isLoggedIn()) ? 'dashboard/create-store' : 'signin');
    }

    sortStores() {
        const {sortBy} = this.state;

        if(sortBy !== '' || sortBy !== undefined) {
            let stores = this.state.stores;
            stores = _.sortBy(stores, ['created_at']);

            this.setState({stores: stores});
        }
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
                                        { this.state.stores.length } ofertas encontradas
                                    </b>
                                </p>
                            </Col>
                            <Col s={6} className="right-align">
                                <p>
                                    <Button onClick={this.redirectToCreateOffer} waves='light'>
                                        Indicar
                                    </Button>

                                    <Button flat waves='light' className="m-l-20">
                                        Ordenar
                                    </Button>
                                </p>
                            </Col>
                        </div>
                    </Row>
                </Col>

                <Col s={12}>
                    <Row>
                        <div className="container">
                            <Col s={12} m={3}>
                                {/*<StoreFilter categories={this.state.categories}/>*/}
                            </Col>

                            <Col s={12} m={9}>
                                <Row>
                                    {/* Listagem das ofertas */}
                                    <StoreList stores={this.state.stores} />
                                </Row>

                                <Row>
                                    {/* Permite a busca de mais ofertas */}
                                    <p className="center-align">
                                        <Loader onClick={this.moreStores} loading={this.state.loading} />
                                    </p>
                                </Row>
                            </Col>
                        </div>
                    </Row>
                </Col>
            </Row>
        );
    }
}