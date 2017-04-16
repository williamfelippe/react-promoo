import React, {Component} from "react";
import {Button, Col, Icon, Input, Row} from "react-materialize";
import PlacesAutocomplete, {geocodeByPlaceId} from "react-places-autocomplete";
import {browserHistory} from "react-router";
import {validate} from "../../../utils/validator";
import {getStoreCategories, postStore} from "../../../services/store-service";
import {publishMessage} from "../../../utils/messages-publisher";
import {clearUserStore, getLoggedUserId} from "../../../utils/user-information-store";
import {verifyPlaceType} from "../../../utils/place-types";
import {expiredSessionError, opsInternalError, thanksForHelpSuccess} from "../../../utils/strings";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../../utils/constants";
import Loader from "../../util/loader/loader";
import "../create-store-form/create-store-form.css";

export default class CreateStoreFormTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            address: '',
            city: '',
            street: '',
            state: '',
            neighborhood: '',
            description: '',
            lat: 0,
            lng: 0,
            storeCategories: [],
            loadingCategories: false,
            loadingSubmit: false
        };
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        this.setState({loadingCategories: true});

        getStoreCategories()
            .then((response) => {
                const status = response.status;

                if (status === REQUEST_SUCCESS) {
                    this.setState({storeCategories: response.data})
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loadingCategories: false});
            })
            .catch((error) => {
                publishMessage(opsInternalError);
                this.setState({loadingCategories: false});
            });
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeStoreCategory(event) {
        this.setState({category: event.target.value});
    }

    onChangeAddress(address) {
        this.setState({address});
    }

    onSelectAddress(address, addressId) {
        this.setState({address});

        geocodeByPlaceId(addressId, (error, {lat, lng}, results) => {
            if (error) {
                return
            }

            this.setState({lat, lng});
            const location = results[0].address_components;

            location.forEach((item) => {
                const placeType = verifyPlaceType(item.types);

                switch (placeType) {
                    case 'street':
                        this.setState({street: item.long_name});
                        break;
                    case 'neighborhood':
                        this.setState({neighborhood: item.long_name});
                        break;
                    case 'city':
                        this.setState({city: item.long_name});
                        break;
                    case 'state':
                        this.setState({state: item.long_name});
                        break;
                    default:
                        break;
                }
            });
        });
    }

    submit(event) {
        event.preventDefault();

        const data = {
            nome: this.state.name,
            categoria: this.state.category,
            cidade: this.state.city,
            rua: this.state.street,
            bairro: this.state.neighborhood,
        };

        const rules = {
            nome: 'required',
            categoria: 'required',
            cidade: 'required',
            rua: 'required',
            bairro: 'required'
        };

        const validator = validate(data, rules);

        if (validator.passes()) {
            this.indicateStore({
                name: this.state.name,
                address: {
                    street: this.state.street,
                    neighborhood: this.state.neighborhood,
                    city: this.state.city,
                    latitude: this.state.lat,
                    longitude: this.state.lng,
                },
                category: this.state.category,
                description: this.state.description,
                user: getLoggedUserId()
            });
        }
        else {
            const errors = validator.errors;

            publishMessage(
                ...errors.get('nome'),
                ...errors.get('categoria'),
                ...errors.get('cidade'),
                ...errors.get('rua'),
                ...errors.get('bairro')
            );
        }
    }

    indicateStore(data) {
        this.setState({loadingSubmit: true});

        postStore(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === REQUEST_SUCCESS) {
                    publishMessage(thanksForHelpSuccess);
                    browserHistory.push('/dashboard/lojas');
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loadingSubmit: false});
            })
            .catch((error) => {
                const status = error.response.status;
                
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
            types: ['address'],
            componentRestrictions: {'country': 'br'}
        };

        const listCategories = this.state.storeCategories.map((storeCategory) =>
            <option value={storeCategory._id} key={storeCategory._id}>
                {storeCategory.name}
            </option>
        );

        const submitButton = (this.state.loadingSubmit)
            ? <Loader />
            : <Button waves="light" type="submit" className="right">Indicar</Button>;

        return (
            <Row className="moo-create-store">
                <form onSubmit={this.submit.bind(this)} className="col s12">
                    <Row>
                        <Col s={12} className="n-padding">
                            <p className="icon">
                                <Icon>store</Icon>
                            </p>

                            <Input s={12} type="text" label="Nome da loja" onChange={this.onChangeName.bind(this)}/>
                        </Col>
                    </Row>

                    <Row>
                        {
                            /* Categoria do produto */
                            (this.state.loadingCategories) ?
                                <Loader /> :
                                <Input s={12} type="select" defaultValue="" label="Escolha uma categoria"
                                       onChange={this.onChangeStoreCategory.bind(this)}>
                                    <option value="" disabled>Escolhe uma aí =)</option>
                                    {listCategories}
                                </Input>
                        }
                    </Row>

                    <Row>
                        <Col s={12} className="n-padding">
                            <p className="help">
                                Em qual rua fica essa loja?
                            </p>

                            <div className="place-filter">
                                <PlacesAutocomplete
                                    value={this.state.address}
                                    onChange={this.onChangeAddress.bind(this)}
                                    onSelect={this.onSelectAddress.bind(this)}
                                    options={options}
                                    placeholder="&nbsp;" hideLabel>

                                    <Input s={12} label="Procurar por endereço" className="m-l-20 m-r-20"/>
                                </PlacesAutocomplete>
                            </div>
                        </Col>
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