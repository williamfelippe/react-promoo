import React, {Component} from 'react';
import {Row, Col, Input} from 'react-materialize';

export default class OfferFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedCategories: [],
            minPrice: 0,
            maxPrice: Number.POSITIVE_INFINITY
        };

        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.onChangeMinPrice = this.onChangeMinPrice.bind(this);
        this.onChangeMaxPrice = this.onChangeMaxPrice.bind(this);
    }

    onChangeCheck(event) {
        console.log(event.target.value);
    }

    onChangeMinPrice() {
        this.setState({minPrice: event.target.value});
    }

    onChangeMaxPrice() {
        this.setState({maxPrice: event.target.value});
    }

    render() {
        const listCategoriesFilter =
            this.props.categories.map((category) =>
                <p s={12} key={category._id}>
                    <Input type='checkbox' value={category._id} label={category.name} onChange={this.onChangeCheck}/>
                </p>
            );

        const priceFilter = <p>
            <Input s={6} type="number" label="Mínimo" onChange={this.onChangeMinPrice}/>
            <Input s={6} type="number" label="Máximo" onChange={this.onChangeMaxPrice}/>
        </p>;

        return (
            <Row>
                <Col s={12}>
                    <p>
                        <b>Categorias</b>
                    </p>

                    {listCategoriesFilter}
                </Col>

                <Col s={12} className="n-padding">
                    <p>
                        <b>Preço</b>
                    </p>

                    {priceFilter}
                </Col>
            </Row>
        )
    }
}