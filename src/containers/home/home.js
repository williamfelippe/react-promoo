import React, {Component} from 'react';
import Banner from '../../components/home/banner/banner';
import Contact from '../../components/home/contact/contact';
import Apps from '../../components/home/apps/apps';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Banner />

                <Contact />

                <Apps />
            </div>
        )
    }
}