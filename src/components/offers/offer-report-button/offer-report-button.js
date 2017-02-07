import React, {Component} from 'react';
import {Modal} from 'react-materialize';
import {Row, Col, Input, Button} from 'react-materialize';
import * as offerService from '../../../services/offer-service';
import './offer-report-button.css';

export default class OfferReportButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subject: '',
            message: '',
        };

        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.submit = this.submit.bind(this);
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
            'report_by': 1,//this.userStore.getId(),
            'offer_id': this.props.offer._id
        };

        console.log(this.state);

        /*offerService.postOfferReport(data)
         .then((response) => {
         console.log(response);
         })
         .catch((error) => {
         console.log(error);
         })*/
    }

    render() {
        const blockLink = <a className="report"><i className="material-icons">block</i></a>;
        return (
            <Modal header='Algum problema?' trigger={blockLink}
                   actions={<Button waves='light' modal='close' flat>Voltar</Button>}>
                <p className="m-t-40">
                    Maecenas consequat posuere blandit. Curabitur quis interdum tortor. Nulla sagittis molestie ante et
                    eleifend.
                </p>
                <form onSubmit={this.submit} className="col s12">
                    <Row>
                        <Col s={12} m={8} offset="m2">
                            <Row>
                                <Input s={12} type="select" label="Assunto" onChange={this.onChangeSubject} defaultValue="Expirou">
                                    <option value="Expirou">Expirou</option>
                                    <option value="Não existe">Não existe</option>
                                    <option value="Outro">Outro</option>
                                </Input>

                                {
                                    this.state.subject.localeCompare('Outro') === 0 &&
                                    <Input s={12} type="textarea" label="Qual o problema?"
                                           onChange={this.onChangeMessage}/>
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