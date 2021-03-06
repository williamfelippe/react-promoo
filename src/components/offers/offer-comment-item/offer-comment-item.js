import React, {Component} from "react";
import {Row, Col, Chip} from "react-materialize";
import {formatDate} from "../../../utils/date-format";
import ImageWrapper from "../../util/image-wrapper/image-wrapper";
import avatar from "../../../images/default_avatar.png";
import "./offer-comment-item.css";

export default class OfferCommentItem extends Component {
    render() {
        const {comment} = this.props;
        return (
            <Row className="moo-offer-comment">
                <Col s={12}>
                    <Chip className="m-bottom-20">
                        <ImageWrapper placeholder={avatar} src={comment.user.photo}
                            alt={comment.user.name} />
                        {comment.user.name}
                    </Chip>
                    <p className="message">
                        {comment.message}
                    </p>
                    <p className="date">
                        { formatDate(comment.created_at) }
                    </p>
                </Col>
            </Row>
        );
    }
}