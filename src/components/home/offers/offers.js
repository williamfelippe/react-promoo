import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import OfferList from "../../offers/offer-list/offer-list";
import Loader from "../../util/loader/loader";
import {getOffers} from "../../../services/offer-service";
import "./offers.css";

export default class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {offers: [], loading: false};
    }

    componentDidMount() {
        this.getAllOffers();
    }

    getAllOffers() {
        const offset = 0, limit = 12;

        this.setState({loading: true});

        getOffers(limit, offset)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    this.setState({offers: response.data});
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loading: false});
            })
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    render() {
        const offers = (this.state.loading) ? <Loader /> :
            <OfferList offers={this.state.offers}/>;

        return (
            <Row className="moo-home-last-offers">
                <Col s={12}>
                    <div className="container">
                        <h2 className="center-align">
                            Economize
                        </h2>

                        <p className="center-align m-b-40">
                            Encontre promoções nos estabelecimentos mais próximos de você
                        </p>

                        {offers}
                    </div>
                </Col>
            </Row>
        )
    }
}