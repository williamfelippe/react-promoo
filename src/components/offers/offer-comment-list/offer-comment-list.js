import React, {Component} from 'react';
import OfferCommentItem from '../offer-comment-item/offer-comment-item';

export default class OfferCommentList extends Component {
    render() {
        const listComments = this.props.comments.map((comment) =>
            <li key={comment._id}>
                <OfferCommentItem comment={comment}/>
            </li>
        );

        return (
            <ul className="moo-offer-comments-list">
                {listComments}
            </ul>
        )
    }
}