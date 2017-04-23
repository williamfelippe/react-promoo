import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import {browserHistory} from "react-router";
import {getStores, getStoreCategories} from "../../services/store-service";
import {REQUEST_SUCCESS} from "../../utils/constants";
import AddBar from "../../components/system/add-bar/add-bar";
import StoreFilter from "../../components/stores/store-filter/store-filter";
import StoreList from "../../components/stores/store-list/store-list";
import Loader from "../../components/util/loader/loader";
import LoadMoreButton from "../../components/util/load-more-button/load-more-button";
import NoContent from "../../components/util/no-content/no-content";

export default class Stores extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: [],
            categories: [],
            limit: 30,
            offset: 0,
            loadingStores: false,
            loadingCategories: false,
            query: {}
        };
    }

    componentDidMount() {
        const {search, query} = this.props.location;

        this.setState({query: query});
        this.getAllStores((search && query) ? search : null);
        this.getAllCategories();
    }

    componentWillReceiveProps(nextProps) {
        const {search, query} = nextProps.location;

        this.setState({query: query});
        if (search) {
            this.setState({stores: [], offset: 0, limit: 30});
            this.getAllStores(search);
        }
    }

    getAllStores(search = null) {
        this.setState({loadingStores: true});

        getStores(this.state.limit, this.state.offset, search)
            .then((response) => {
                this.treatStoresResponse(response);
                this.setState({loadingStores: false});
            })
            .catch((error) => {
                this.setState({loadingStores: false});
            })
    }

    treatStoresResponse(response) {
        const statusCode = response.status;

        if (statusCode === REQUEST_SUCCESS) {
            this.setState((prevState, props) => ({
                stores: prevState.stores.concat(response.data)
            }));
        }
        else {
            throw new Error(response.data);
        }
    }

    getAllCategories() {
        this.setState({loadingCategories: true});

        getStoreCategories()
            .then((response) => {
                this.treatStoreCategoriesResponse(response);
                this.setState({loadingCategories: false});
            })
            .catch((error) => {
                this.setState({loadingCategories: false});
            })
    }

    treatStoreCategoriesResponse(response) {
        const statusCode = response.status;

        if (statusCode === REQUEST_SUCCESS) {
            this.setState({categories: response.data});
        }
        else {
            throw new Error(response.data);
        }
    }

    moreStores() {
        this.setState({offset: this.state.limit});
        this.getAllStores();
    }

    //noinspection JSMethodCanBeStatic
    redirectToCreateStore() {
        browserHistory.push('dashboard/criar-loja');
    }

    render() {
        const {
            stores,
            loadingStores,
            categories,
            loadingCategories
        } = this.state;

        return (
            <Row className="m-b-40">
                <AddBar amount={stores.length}
                        redirectToPage={this.redirectToCreateStore.bind(this)}
                        buttonName="Indicar"/>

                <Col s={12}>
                    <Row>
                        <div className="container">
                            <Col s={12} m={3}>
                                {
                                    (categories.length > 0 && stores.length > 0) &&
                                        <StoreFilter 
                                            query={this.state.query} 
                                            categories={categories}/>
                                }

                                {
                                    /* Exibe uma imagem de "loading" */
                                    (loadingCategories) && <Loader />
                                }
                            </Col>

                            <Col s={12} m={9}>
                                {
                                    /* Listagem das ofertas */
                                    stores.length > 0 && <StoreList stores={stores}/>
                                }

                                {
                                    /* Permite a busca de mais lojas ou exibe uma imagem de "loading" */
                                    <LoadMoreButton loading={loadingStores}
                                                    onClick={this.moreStores.bind(this)}/>
                                }
                            </Col>

                            <Col s={12}>
                                {
                                    (stores.length <= 0 && !loadingStores) &&
                                    <NoContent message="Nenhuma loja até o momento =(" />
                                }
                            </Col>
                        </div>
                    </Row>
                </Col>
            </Row>
        );
    }
}