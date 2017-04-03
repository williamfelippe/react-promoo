import React, {Component} from "react";
import {Button, Col, Icon, Input, Row} from "react-materialize";
import {getOfferComments, postOfferComment} from "../../../services/offer-service";
import {publishMessage} from "../../../utils/messages-publisher";
import {clearUserStore, getLoggedUserId, isLoggedIn} from "../../../utils/user-information-store";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../../utils/constants";
import {expiredSessionError, opsInternalError} from "../../../utils/strings";
import {browserHistory} from "react-router";
import Loader from "../../util/loader/loader";
import OfferCommentList from "../offer-comment-list/offer-comment-list";
import "./offer-comment-box.css";
import * as PubSub from "pubsub-js";

const TAG = "show-or-hide-comment-nav";

class OfferCommentBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            message: '',
            loadingComments: false,
            loadingSendComments: false
        }
    }

    componentDidMount() {
        const {offerId} = this.props;

        if (offerId && offerId !== undefined) {
            this.getComments(offerId);
        }
        else {
            PubSub.subscribe(TAG, (subject, message) => {
                if (subject.localeCompare(TAG) === 0) {
                    this.getComments(message.offer._id);
                }
            });

        }
    }

    getComments(offerId) {
        this.setState({loadingComments: true});

        getOfferComments(offerId)
            .then((response) => {
                this.treatOfferCommentsResponse(response);
                this.setState({loadingComments: false});
            })
            .catch((error) => {
                console.log(error);

                publishMessage(opsInternalError);
                this.setState({loadingComments: false});
            });
    }

    treatOfferCommentsResponse(response) {
        const statusCode = response.status;

        if (statusCode === REQUEST_SUCCESS) {
            this.setState({comments: response.data});
            console.log(this.state.comments);
        }
        else {
            throw new Error(response.data);
        }
    }

    onChangeMessage(event) {
        this.setState({message: event.target.value});
    }

    onFocusMessage(event) {
        console.log('Focus');
        if (!isLoggedIn()) {
            browserHistory.push('entrar');
        }
    }

    sendComment() {
        const data = {
            message: this.state.message,
            user: getLoggedUserId(),
            offer: this.props.offerId
        };

        this.setState({loadingSendComments: true});

        postOfferComment(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === REQUEST_SUCCESS) {
                    this.setState({comments: response.data});
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loadingSendComments: false});
            })
            .catch((error) => {
                this.setState({loadingSendComments: false});

                const status = error.response.status;
                console.log(status);

                if (status && status === UNAUTHORIZED) {
                    publishMessage(expiredSessionError);

                    clearUserStore();
                    browserHistory.push('/');
                }
                else {
                    publishMessage(opsInternalError);
                    this.setState({loadingSubmit: false});
                }
            });
    }

    render() {
        return (
            <Row>
                <Col s={12}>
                    <h4>Comente aí ;)</h4>

                    <form onSubmit={this.props.sendComment} className="moo-comments-form">
                        <Input s={12} type="textarea" label="Deixe seu comentário"
                               onChange={this.onChangeMessage.bind(this)} onFocus={this.onFocusMessage.bind(this)}/>

                        <Button waves="light" className="right">
                            Enviar
                            <Icon right>send</Icon>
                        </Button>
                        <div className="clearfix"/>
                    </form>

                    {
                        (this.state.loadingComments) ? <Loader />
                            : <OfferCommentList comments={this.state.comments}/>
                    }
                </Col>
            </Row>
        );
    }
}

OfferCommentBox.propTypes = {
    offerId: React.PropTypes.string
};

export default OfferCommentBox;