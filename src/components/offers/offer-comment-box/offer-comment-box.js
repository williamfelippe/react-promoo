import React, {Component} from 'react';
import {Row, Col, Icon} from 'react-materialize';
import PubSub from 'pubsub-js';
//import OfferCommentList from '../offer-comment-list/offer-comment-list';
import * as offerService from '../../../services/offer-service';
import * as messagesPublisher from "../../../utils/messages-publisher";
import './offer-comment-box.css';

export default class OfferCommentBox extends Component {
    constructor() {
        super();
        this.state = {
            offer: {},
            openCommentBox: false,
            comments: [],
            loading: false
        }
    }

    componentDidMount() {
        PubSub.subscribe('show-offer-comments', (subject, message) => {
            if(subject.localeCompare('show-offer-comments') === 0) {
                this.setState({
                    offer: message.offer,
                    openCommentBox: message.openCommentBox
                });

                (this.state.openCommentBox) ? this.getOfferComments() : this.setState({comments: []});
            }
        });
    }

    getOfferComments() {
        this.setState({loadingOffers: true});

        offerService
            .getOfferComments(this.state.offer._id)
            .then((response) => {
                this.treatOfferCommentsResponse(response);
                this.setState({loading: false});
            })
            .catch((error) => {
                console.log(error);

                messagesPublisher.showMessage(["Ops... Parece que estamos com alguns problemas"]);

                this.setState({loading: false});
            });
    }

    treatOfferCommentsResponse(response) {
        const statusCode = response.status;

        if(statusCode === 200) {
           this.setState({comments: response.data});
           console.log(this.state.comments);
        }
        else {
            throw new Error(response.data);
        }
    }

    render() {
        const openOrCloseScreen = (this.state.openCommentBox)
            ? 'moo-comments-box open'
            : 'moo-comments-box close';

        return (
            <Row className={openOrCloseScreen}>
                <Col s={12}>
                    <a onClick={() => this.setState({openCommentBox: false})}>
                        <Icon className="right">
                            close
                        </Icon>
                    </a>
                </Col>

                <Col s={12}>
                    {/*<OfferCommentList comments={this.props.comments} />*/}
                </Col>
            </Row>
        );
    }
}