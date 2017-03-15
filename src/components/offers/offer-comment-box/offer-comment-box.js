import React, {Component} from "react";
import {Row, Col, Input, Button, Icon} from "react-materialize";
import Loader from "../../util/loader/loader";
import OfferCommentList from "../offer-comment-list/offer-comment-list";
import {postOfferComment, getOfferComments} from "../../../services/offer-service";
import * as messagesPublisher from "../../../utils/messages-publisher";
import * as userInformationStore from "../../../utils/user-information-store";
import "./offer-comment-box.css";

class OfferCommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offer: {},
            comments: [],
            message: '',
            loadingComments: false,
            loadingSendComments: false
        }
    }

    componentDidMount() {
        this.getComments();
    }

    getComments() {
        this.setState({loadingComments: true});

        getOfferComments(this.state.offer._id)
            .then((response) => {
                this.treatOfferCommentsResponse(response);
                this.setState({loadingComments: false});
            })
            .catch((error) => {
                console.log(error);

                messagesPublisher.showMessage("Ops... Parece que estamos com alguns problemas");

                this.setState({loadingComments: false});
            });
    }

    treatOfferCommentsResponse(response) {
        const statusCode = response.status;

        if (statusCode === 200) {
            this.setState({comments: response.data});
            console.log(this.state.comments);
        } else {
            throw new Error(response.data);
        }
    }

    onChangeMessage(event) {
        this.setState({message: event.target.value});
    }

    sendComment() {
        const data = {
            message: this.state.message,
            user: userInformationStore.getLoggedUserId(),
            offer: this.props.offerId
        };

        this.setState({loadingSendComments: true});

        postOfferComment(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    this.setState({comments: response.data});
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loadingSendComments: false});
            })
            .catch((error) => {
                this.setState({loadingSendComments: false});
                messagesPublisher.showMessage("Ops... Parece que estamos com alguns problemas");
            });
    }

    render() {
        return (
            <Row>
                <Col s={12}>
                    <h4>Comente aí ;)</h4>

                    <form onSubmit={this.props.sendComment} className="moo-comments-form">
                        <Input s={12} type="textarea" label="Deixe seu comentário"
                               onChange={this.onChangeMessage.bind(this)}/>

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
    offerId: React.PropTypes.number
};

export default OfferCommentBox;