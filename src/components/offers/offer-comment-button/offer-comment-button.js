import React, {Component} from 'react';
import {Modal, Icon} from 'react-materialize';
import OfferCommentBox from '../offer-comment-box/offer-comment-box';

export default class OfferCommentButton extends Component {
    constructor() {
        super();
        this.state({openModal: false});
    }

    render() {
        const commentLink = 
            <a onClick={() => this.setState({openModal: true})}>
                <Icon className="comment">mode_comment</Icon>
            </a>;

        return (
            <Modal bottomSheet
                header={this.props.offer.name}
                trigger={commentLink}
                actions={null}>

                <OfferCommentBox openModal={this.state.openModal} />
            </Modal>
        );
    }
}