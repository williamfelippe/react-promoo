import React, {Component} from 'react';
import {Modal} from 'react-materialize';
import {Row, Col, Input, Button, Icon} from 'react-materialize';
import * as offerService from '../../../services/offer-service';
import * as userInformationStore from '../../../utils/user-information-store';
import './offer-report-button.css';

export default class OfferReportButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subject: '',
            message: '',
        };
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
            'report_by': userInformationStore.getLoggedUserId(),
            'offer_id': this.props.offer._id
        };

        console.log(this.state);

        offerService.postOfferReport(data)
            .then((response) => {
                const statusCode = response.status;
                if(statusCode === 200) {
                    console.log(response.data);
                }
                else {
                    throw new Error(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const reportLink = <a className="report"><Icon>block</Icon></a>;

        const message =
            this.state.subject.localeCompare('Outro') === 0 &&
            <Input s={12} type="textarea" label="Qual o problema?"
                   onChange={this.onChangeMessage.bind(this)}/>;

        return (
            <Modal header='Algum problema?' trigger={reportLink}
                   actions="&nbsp;">

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