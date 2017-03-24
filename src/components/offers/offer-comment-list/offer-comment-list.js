import React, {Component} from "react";
import OfferCommentItem from "../offer-comment-item/offer-comment-item";
import "./offer-comment-list.css";

export default class OfferCommentList extends Component {
    render() {
        const listComments = this.props.comments.map((comment) =>
            <li key={comment._id}>
                <OfferCommentItem comment={comment}/>
            </li>
        );

        const noComments = <h3>Seja o primeiro a comentar ;)</h3>;
        const list = <ul className="moo-offer-comments-list">{listComments}</ul>;

        return ((this.props.comments.length > 0) ? list : noComments)
    }
}