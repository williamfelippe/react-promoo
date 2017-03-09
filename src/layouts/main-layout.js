import React, {Component} from 'react';
import {Button} from 'react-materialize';
import ScrollUp from 'react-scroll-up';
import Header from '../components/system/header/header'
import Footer from '../components/system/footer/footer'
import Notification from '../components/util/notification/notification';
import OfferCommentBox from '../components/offers/offer-comment-box/offer-comment-box';

export default class MainLayout extends Component {
    render() {
        return (
            <div className="moo-app">
                <Header/>

                <OfferCommentBox />

                <main>
                    <Notification/>

                    {this.props.children}
                </main>

                <ScrollUp showUnder={160}>
                    <Button floating className='moo-scroll-up-button'
                        waves='light' icon='keyboard_arrow_up'/>
                </ScrollUp>

                <Footer/>
            </div>
        )
    }
}