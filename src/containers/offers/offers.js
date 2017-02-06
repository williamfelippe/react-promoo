import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import OfferFilter from '../../components/offer-filter/offer-filter';
import OfferItem from '../../components/offer-item/offer-item';
import * as offerService from '../../services/offer-service';

export default class Offers extends Component {
    constructor(props) {
        super(props);

        this.state = {offers: [], categories: [], offset: 0, limit: 30};

        this.moreOffers = this.moreOffers.bind(this);
    }

    componentDidMount() {
        this.getOffers();
    }

    getOffers() {
        offerService
            .getOffers(this.state.limit, this.state.offset)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    console.log('Ofertas');
                    console.log(response.data);

                    let offers = this.state.offers;
                    response.data.forEach((item) => {
                        offers.push(item);
                    });

                    this.setState({offers: offers});
                }
                else {

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    moreOffers() {
        this.setState({
            offset: this.state.limit,
            limit: this.state.limit + 30
        });

        this.getOffers();
    }

    render() {
        const listOffers = this.state.offers.map((offer) =>
            <Col s={12} m={6} l={4} key={offer._id}>
                <OfferItem offer={offer}/>
            </Col>
        );

        return (
            <div className="container">
                <Row>
                    <Col s={12} m={3}>
                        <OfferFilter/>
                    </Col>

                    {/* Listagem das ofertas */}
                    <Col s={12} m={9}>
                        <Row>
                            {listOffers}
                        </Row>
                    </Col>

                    {/* Permite a busca de mais ofertas */}
                    <Col s={12}>
                        <p className="center-align">
                            <a onClick={this.moreOffers} className="moo-loader-more"></a>
                        </p>
                    </Col>
                </Row>
            </div>
        )
    }
}