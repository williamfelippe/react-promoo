import React, {Component} from "react";
import {Icon} from "react-materialize";
import PubSub from "pubsub-js";
import OfferCommentBox from "../offer-comment-box/offer-comment-box";
import "./offer-comment-nav.css";

const TAG = "show-or-hide-comment-nav";

export default class OfferCommentNav extends Component {
    constructor() {
        super();
        this.state = {
            offer: {},
            openNav: false
        }
    }

    componentDidMount() {
        PubSub.subscribe(TAG, (subject, message) => {
            if (subject.localeCompare(TAG) === 0) {
                this.setState({offer: message.offer, openNav: message.openNav});
                console.log(this.state.offer);
            }
        });
    }

    closeNav() {
        this.setState({openNav: false, offer: {}});
    }

    render() {
        const openNav = (this.state.openNav) ? 'increaseNav' : 'decreaseNav';

        return (
            <div className={`sidenav ${openNav}`}>
                <a onClick={this.closeNav.bind(this)} className="closebtn">
                    <Icon>close</Icon>
                </a>

                {
                    (this.state.offer) && 
                    <OfferCommentBox offerId={this.state.offer._id}/>
                }
            </div>
        )
    }
}