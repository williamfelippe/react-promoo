import React, {Component} from "react";
import _ from "lodash";
import {Row, Col} from "react-materialize";
import axios from "axios";
import {browserHistory} from "react-router";
import AddBar from "../../components/system/add-bar/add-bar";
import StoreList from "../../components/stores/store-list/store-list";
import TextLoader from "../../components/util/text-loader/text-loader";
import * as userInformationStore from "../../utils/user-information-store";
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
            this.setState({categories: response.data});
        }
        else {

        }
    }

    moreStores() {
        this.setState({offset: this.state.limit});
        this.getStores();
    }

    redirectToCreateOffer() {
        browserHistory.push((userInformationStore.isLoggedIn())
            ? 'dashboard/create-store'
            : 'signin');
    }

    sortStores() {
        const {sortBy} = this.state;

        if (sortBy !== '' || sortBy !== undefined) {
            let stores = this.state.stores;
            stores = _.sortBy(stores, ['created_at']);

            this.setState({stores: stores});
        }
    }

    render() {
        return (
            <Row className="m-b-40">
                <AddBar amount={this.state.stores.length} redirectToPage={this.redirectToCreateOffer}
                        buttonName="Indicar"/>

                <Col s={12}>
                    <Row>
                        <div className="container">
                            <Col s={12}>
                                {/*<StoreFilter categories={this.state.categories}/>*/}
                            </Col>

                            <Col s={12}>
                                <Row>
                                    {/* Listagem das ofertas */}
                                    <StoreList stores={this.state.stores}/>
                                </Row>

                                <Row>
                                    {/* Permite a busca de mais ofertas */}
                                    <p className="center-align">
                                        <TextLoader onClick={this.moreStores.bind(this)} loading={this.state.loading}/>
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