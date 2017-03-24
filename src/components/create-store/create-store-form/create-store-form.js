import React, {Component} from "react";
import {Row, Col, Input, Icon, Button} from "react-materialize";
import PlacesAutocomplete, {geocodeByPlaceId} from "react-places-autocomplete";
import {getStoreCategories} from "../../../services/store-service";
import {publishMessage} from "../../../utils/messages-publisher";
import Loader from "../../util/loader/loader";
import "../create-store-form/create-store-form.css";

export default class CreateStoreFormTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            city: '',
            cityId: '',
            street: '',
            state: '',
            neighborhood: '',
            lat: 0,
            lng: 0,
            storeCategories: [],
            loadingCategories: false
        };
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        this.setState({loadingCategories: true});

        getStoreCategories()
            .then((response) => {
                console.log(response);
                const status = response.status;

                if(status === 200) {
                    this.setState({storeCategories: response.data})
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loadingCategories: false});
            })
            .catch((error) => {
                console.log(error);
                publishMessage("Ops... Parece que estamos com alguns problemas");

                this.setState({loadingCategories: false});
            });
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeStoreCategory(event) {
        this.setState({category: event.target.value});
    }

    onChangeNeighborhood(event) {
        this.setState({neighborhood: event.target.value});
    }

    onChangeCity(city) {
        this.setState({city});
    }

    onSelectCity(city, cityId) {
        console.log(`Cidade selecionada: ${city} - ${cityId}`);

        geocodeByPlaceId(cityId, (error, {lat, lng}, results) => {
            if (error) {
                return
            }

            this.setState({
                city, cityId,
                lat: lat,
                lng: lng,
                street: results[0].address_components[0].long_name,
                state: results[0].address_components[2].short_name
            })

            console.log('Novo estado ' + this.state);
        });
    }

    submit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        const options = {
            types: ['(cities)'],
            componentRestrictions: {'country': 'br'}
        };

        const listCategories = this.state.storeCategories.map((storeCategory) =>
            <option value={storeCategory._id} key={storeCategory._id}>
                {storeCategory.name}
            </option>
        );

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
                            <p className="icon">
                                <Icon>place</Icon>
                            </p>

                            <p className="help">
                                Conte-nos em qual cidade você encontrou essa promoção
                            </p>

                            <div className="place-filter">
                                <PlacesAutocomplete
                                    value={this.state.city}
                                    onChange={this.onChangeCity.bind(this)}
                                    onSelect={this.onSelectCity.bind(this)} options={options}
                                    placeholder="&nbsp;" hideLabel>
                                    
                                    <Input s={12} label="Procurar por endereço" className="m-l-20 m-r-20"/>
                                </PlacesAutocomplete>
                            </div>
                        </Col>
                    </Row>

                    {
                        (this.city) &&
                        <Row>
                            <Input s={12} type="text" label="Bairro" onChange={this.onChangeNeighborhood.bind(this)}/>

                            <p className="help">
                                Em qual bairro fica essa loja/supermercado
                            </p>
                        </Row>
                    }

                    <Row>
                        <Col s={12}>
                            <Button waves="light" type="submit" className="right">
                                Indicar
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Row>
        )
    }
}