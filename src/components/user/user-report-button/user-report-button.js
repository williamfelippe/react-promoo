import React, {Component} from "react";
import {Button, Modal, Col, Row, Input} from "react-materialize";
import {postUserReport} from "../../../services/user-service";
import {clearUserStore, getLoggedUserId} from "../../../utils/user-information-store";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../../utils/constants";
import {expiredSessionError, opsInternalError} from "../../../utils/strings";
import {publishMessage} from "../../../utils/messages-publisher";
import {browserHistory} from "react-router";

export default class UserReportButton extends Component {
    constructor(props) {
        super(props);

        this.state = {reason: '', message: ''};
    }

    onChangeReason(event) {
        this.setState({reason: event.target.value});
    }

    onChangeMessage(event) {
        this.setState({message: event.target.value});
    }

    submit(event) {
        event.preventDefault();
        this.reportUser();
    }

    reportUser() {
        const data = {
            user_id: this.props.user._id,
            reason: this.state.reason,
            report_by: getLoggedUserId()
        };

        postUserReport(data).then((response) => {
                const statusCode = response.status;
                
                if(statusCode === REQUEST_SUCCESS) {
                    console.log(response.data);
                }
                else {
                    throw new Error(response.data);
                }
            })
            .catch((error) => {
                console.log(error);

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
        const reportButton = <Button waves="light">Denunciar</Button>;

        return (
            <Modal header='O que esse usuário fez?' trigger={reportButton}
                   actions="&nbsp;">
                <p className="m-t-40">
                    Maecenas consequat posuere blandit. Curabitur quis interdum tortor. Nulla sagittis molestie ante et
                    eleifend.
                </p>
                <form onSubmit={this.submit.bind(this)} className="col s12">
                    <Row>
                        <Col s={12} m={8} offset="m2">
                            <Row>
                                <Input s={12} type="select" label="Motivo" onChange={this.onChangeReason.bind(this)}
                                       defaultValue="Expirou">
                                    <option value="Falsas promoções">Falsas promoções</option>
                                    <option value="Spam">Spam</option>
                                    <option value="Outro">Outro</option>
                                </Input>

                                {
                                    this.state.reason.localeCompare('Outro') === 0 &&
                                    <Input s={12} type="textarea" label="Descreva o problema"
                                           onChange={this.onChangeMessage.bind(this)}/>
                                }

                                <Button type="submit" waves="light" className="w-100">
                                    Enviar
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </form>
            </Modal>
        )
    }
}