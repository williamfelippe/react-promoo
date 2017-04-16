import React, {Component} from "react";
import PlacesAutocomplete, {geocodeByPlaceId} from "react-places-autocomplete";
import {Button, Col, Icon, Input, Row} from "react-materialize";
import {browserHistory} from "react-router";
import {verifyPlaceType} from "../../../utils/place-types";
import queryString from "query-string";

export default class StoreFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            category: '',
            city: '',
            address: '',
            filterOpen: true
        };
    }

    componentDidMount() {
        const {query} = this.props;
        if(query.length > 0) browserHistory.push('dashboard/lojas');
    }

    componentWillReceiveProps() {
        this.threatQueryParams();
    }

    threatQueryParams() {
        const {query} = this.props;

        const name = (query.name && query.name !== undefined) ? query.name : '';
        const category = (query.category && query.category !== undefined) ? query.category : '';
        const city = (query.city && query.city !== undefined) ? query.city : '';

        this.setState({name, category, city, address: ''});        
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeCategory(event) {
        this.setState({category: event.target.value});
    }

    onChangeAddress(address) {
        this.setState({address});
    }

    onSelectAddress(address, addressId) {
        this.setState({address});

        //noinspection JSUnusedLocalSymbols
        geocodeByPlaceId(addressId, (error, {lat, lng}, results) => {
            if (error) {
                return
            }

            //noinspection JSUnresolvedVariable
            const location = results[0].address_components;

            location.forEach((item) => {
                const placeType = verifyPlaceType(item.types);
                if (placeType === 'city') {
                    //noinspection JSUnresolvedVariable
                    this.setState({city: item.long_name});
                }
            });
        });
    }

    cleanFilter() {
        this.setState = {name: '', category: '', city: '', address: ''};
        browserHistory.push('dashboard/lojas');
    }

    filter() {
        const parsed = {
            name: this.state.name,
            category: this.state.category,
            city: this.state.cityId
        };

        const query = queryString.stringify(parsed);
        const location = `${browserHistory.getCurrentLocation().pathname}?${query}`;

        browserHistory.push(location);
    }

    closeFilter() {
        this.setState({filterOpen: false});
    }

    openFilter() {
        this.setState({filterOpen: true});
    }

    render() {
        const statusFilterButton = (this.state.filterOpen) ? 'hide' : '';
        const statusFilterComponent = (this.state.filterOpen) ? '' : 'hide';

        const options = {
            types: ['(cities)'],
            componentRestrictions: {'country': 'br'}
        };

        const listCategoriesFilter =
            this.props.categories.map((category) =>
                <Row key={category._id}>
                    <Input name="category" type='radio' s={12} value={category._id} label={category.name}
                           onChange={this.onChangeCategory.bind(this)}/>
                </Row>
            );

        return (
            <div>
                <a onClick={this.openFilter.bind(this)}
                   className={`moo-open-filter-button hide-on-med-and-up ${statusFilterButton}`}>
                    <Icon>filter_list</Icon> <span>Filtro</span>
                </a>

                <Row className={`${statusFilterComponent} moo-filter`}>
                    <Col s={12} className="hide-on-med-and-up">
                        <a onClick={this.closeFilter.bind(this)}
                           className="moo-close-filter-button">
                            <Icon>close</Icon>
                        </a>
                    </Col>

                    <Col s={12}>
                        <strong>Nome da oferta</strong>

                        <Row className="n-margin-bottom">
                            <Input s={12} value={this.state.name} onChange={this.onChangeName.bind(this)}/>
                        </Row>
                    </Col>

                    <Col s={12} className="m-b-20">
                        <p>
                            <strong>Categorias</strong>
                        </p>

                        {listCategoriesFilter}
                    </Col>

                    <Col s={12} className="n-padding">
                        <strong className="place">Cidade</strong>

                        <div className="place-filter">
                            <PlacesAutocomplete
                                value={this.state.city} onChange={this.onChangeAddress.bind(this)}
                                onSelect={this.onSelectAddress.bind(this)} options={options} placeholder="&nbsp;"
                                hideLabel>
                                <Input s={12} label="Procurar por endereço"/>
                            </PlacesAutocomplete>
                        </div>
                    </Col>

                    <Col s={12}>
                        <Button waves='light' className="w-100 m-b-20" onClick={this.filter.bind(this)}>
                            Filtrar
                        </Button>

                        <Button flat waves='light' className="w-100" onClick={this.cleanFilter.bind(this)}>
                            Limpar filtro
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}