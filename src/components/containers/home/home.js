import React, {Component} from 'react';
import Banner from '../../views/home/banner/banner';
import Contact from '../../views/home/contact/contact';
import Apps from '../../views/home/apps/apps';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Banner />

                <Contact />

                <Apps />
            </div >
        )
    }
}