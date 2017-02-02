import React, {Component} from 'react';
import OfferItem from '../../../api/offer-api';
import * as offerApi from '../../../api/offer-api';

export default class Offers extends Component {
    constructor() {
        super();
        
        this.state = {
            offers: [],
            categories: [],
            offset: 0,
            limit: 30
        }

        this.moreOffers = this.moreOffers.bind(this);
    }

    componentDidMount() {
        this.getOffers();
    }

    getOffers() {
        offerApi
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
        return (
            <div></div>
        )
    }
}