import React, {Component} from 'react';
import Header from '../components/system/header/header'
import Footer from '../components/system/footer/footer'
import Notification from '../components/util/notification/notification';

export default class MainLayout extends Component {
    render() {
        return (
            <div className="moo-app">
                <Header />

                <main>
                    {this.props.children}
                    <Notification/>
                </main>

                <Footer/>
            </div>
        )
    }
}