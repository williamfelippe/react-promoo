import React, {Component} from 'react';
import OfferFilter from '../../components/offer-filter/offer-filter';
import OfferItem from '../../components/offer-item/offer-item';
import * as offerService from '../../service/offer-service';

export default class Offers extends Component {
    constructor() {
        super();

        this.state = {
            offers: [],
            categories: [],
            offset: 0,
            limit: 30
        };

        this.moreOffers = this
            .moreOffers
            .bind(this);
    }

    componentDidMount() {
        this.getOffers();
    }

    getOffers() {
        offerService
            .getOffers(this.state.limit, this.state.offset)
            .end((err, res) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    if (res.statusCode === 200) {
                        console.log('Ofertas');
                        console.log(res.body);
                        this.setState({offers: res.body});
                    } else {
                        //this.threatHttpErrors();
                    }
                }
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
        const listOffers = this
            .state
            .offers
            .map((offer) => <div className="col s6 m3 l2" key={offer._id}>
                <OfferItem offer={offer}/>
            </div>);

        return (
            <div className="row">

                <div className="col s12">
                    <OfferFilter/>
                </div>

                {/* Listagem das ofertas */}
                <div className="col s12">
                    <div className="row">
                        {listOffers}
                    </div>
                </div>

                {/* Permite a busca de mais ofertas */}
                <div className="col s12">
                    <p className="center-align">
                        <a onClick={this.moreOffers} className="moo-loader-more"></a>
                    </p>
                </div>
            </div>
        )
    }
}