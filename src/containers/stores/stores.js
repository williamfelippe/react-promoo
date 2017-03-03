import React, {Component} from "react";
import _ from "lodash";
import {Row, Col} from "react-materialize";
import {browserHistory} from "react-router";
import AddBar from "../../components/system/add-bar/add-bar";
import StoreFilter from "../../components/stores/store-filter/store-filter";
import StoreList from "../../components/stores/store-list/store-list";
import Loader from "../../components/util/loader/loader";
import LoadMoreButton from "../../components/util/load-more-button/load-more-button";
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
            loadingStore: false,
            loadingCategories: false,
            sortBy: ''
        };
    }

    componentDidMount() {
        this.getStores();
        this.getCategories();
    }

    getStores() {
        this.setState({loadingStore: true});

        storeService.getStores(this.state.limit, this.state.offset)
            .then((response) => {
                this.treatStoresResponse(response);
                this.setState({loadingStore: false});
            })
            .catch((error) => {
                console.log(error);
                this.setState({loadingStore: false});
            })
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
            throw new Error(response.data);
        }
    }

    getCategories() {
        this.setState({loadingCategories: true});

        storeService.getStoreCategories()
            .then((response) => {
                this.treatStoreCategoriesResponse(response);
                this.setState({loadingCategories: false});
            })
            .catch((error) => {
                console.log(error);
                this.setState({loadingCategories: false});
            })
    }

    treatStoreCategoriesResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            this.setState({categories: response.data});
        }
        else {
            throw new Error(response.data);
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
                            <Col s={12} m={3}>
                                { this.state.categories.length && <StoreFilter categories={this.state.categories}/> }

                                {
                                    /* Exibe uma imagem de "loading" */
                                    (this.state.loadingCategories) && <p className="center-align"><Loader /></p>
                                }
                            </Col>

                            <Col s={12} m={9}>
                                {
                                    /* Listagem das ofertas */
                                    this.state.stores.length && <StoreList stores={this.state.stores}/>
                                }

                                <p className="center-align">
                                    {
                                        /* Permite a busca de mais lojas ou exibe uma imagem de "loading" */
                                        (this.state.loadingStore) ? <Loader />
                                            : <LoadMoreButton onClick={this.moreStores.bind(this)} />
                                    }
                                </p>
                            </Col>
                        </div>
                    </Row>
                </Col>
            </Row>
        );
    }
}