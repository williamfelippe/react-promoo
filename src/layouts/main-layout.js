import React, {Component} from "react";
import {Button} from "react-materialize";
import ScrollUp from "react-scroll-up";
import OfferCommentNav from "../components/offers/offer-comment-nav/offer-comment-nav";
import MenuMobile from "../components/system/menu-mobile/menu-mobile";
import Header from "../components/system/header/header";
import Footer from "../components/system/footer/footer";
import Notification from "../components/util/notification/notification";

export default class MainLayout extends Component {
    render() {
        return (
            <div className="moo-app">
                <MenuMobile />

                <OfferCommentNav />

                <Header/>

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