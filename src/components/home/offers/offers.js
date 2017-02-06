import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import './offers.css';

export default class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {offers: []};
    }

    componentDidMount() {
        this.getOffers();
    }

    getOffers() {
        const offset = 0, limit = 12;

        offerService
            .getOffers(limit, offset)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    console.log('Ofertas');
                    console.log(response.data);

                    this.setState({offers: response.data});
                }
                else {

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const listOffers = this.state.offers.map((offer) =>
            <Col s={12} m={6} l={4} key={offer._id}>
                <OfferItem offer={offer}/>
            </Col>
        );

        return (
            <!-- Últimas ofertas postadas -->
            <Row className="moo-home-last-offers">
                <Col s={12}>
                    <div class="container">
                        <h2 class="center-align">
                            Economize
                        </h2>

                        <p class="center-align">
                            Encontre promoções nos estabelecimentos mais próximos de você
                        </p>

                        <Row>
                            {listOffers}
                        </Row>
                    </div>
                </Col>
            </Row>
        )
    }
}