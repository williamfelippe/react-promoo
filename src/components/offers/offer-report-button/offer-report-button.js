import React, {Component} from "react";
import {Button, Col, Icon, Input, Modal, Row} from "react-materialize";
import {postOfferReport} from "../../../services/offer-service";
import {clearUserStore, getLoggedUserId, isLoggedIn} from "../../../utils/user-information-store";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../../utils/constants";
import {expiredSessionError, opsInternalError} from "../../../utils/strings";
import {publishMessage} from "../../../utils/messages-publisher";
import {browserHistory} from "react-router";
import "./offer-report-button.css";

export default class OfferReportButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subject: '',
            message: '',
        };
    }

    componentDidMount() {
        if (isLoggedIn()) {
            browserHistory.push('entrar');
        }
    }

    onChangeSubject(event) {
        this.setState({subject: event.target.value});
    }

    onChangeMessage(event) {
        this.setState({message: event.target.value});
    }

    submit(event) {
        event.preventDefault();
        this.indicateExpiredOffer();
    }

    indicateExpiredOffer() {
        const data = {
            'reason': (this.state.subject.localeCompare('Outro') === 0) ? this.state.message : this.state.subject,
            'report_by': getLoggedUserId(),
            'offer_id': this.props.offer._id
        };

        console.log(this.state);

        postOfferReport(data)
            .then((response) => {
                const statusCode = response.status;
                if (statusCode === REQUEST_SUCCESS) {
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
            })
    }

    render() {
        const reportLink = <a className="report"><Icon>bug_report</Icon></a>;

        const message =
            this.state.subject.localeCompare('Outro') === 0 &&
            <Input s={12} type="textarea" label="Qual o problema?"
                   onChange={this.onChangeMessage.bind(this)}/>;

        return (
            <Modal header='Algum problema?' trigger={reportLink}
                   actions={null}>

                <p className="m-t-40">
                    Maecenas consequat posuere blandit. Curabitur quis interdum tortor. Nulla sagittis molestie ante et
                    eleifend.
                </p>

                <form onSubmit={this.submit.bind(this)} className="col s12">
                    <Row>
                        <Col s={12} m={8} offset="m2">
                            <Row>
                                <Input s={12} type="select" label="Assunto" onChange={this.onChangeSubject.bind(this)}
                                       defaultValue="Expirou">
                                    <option value="Expirou">Expirou</option>
                                    <option value="Não existe">Não existe</option>
                                    <option value="Outro">Outro</option>
                                </Input>

                                {message}

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