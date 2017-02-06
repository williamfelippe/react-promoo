import React, {Component} from 'react';
import Banner from '../../components/home/banner/banner';
import Offers from '../../components/home/offers/offers';
import Contact from '../../components/home/contact/contact';
import Apps from '../../components/home/apps/apps';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Banner />

                <Offers />

                <Contact />

                <Apps />
            </div>
        )
    }
}