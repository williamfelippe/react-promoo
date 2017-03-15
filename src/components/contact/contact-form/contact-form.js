import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import ReCAPTCHA from 'react-google-recaptcha';
import Loader from "../../util/loader/loader";
import * as Validator from '../../../utils/validator';
import {sendMessage} from '../../../services/system-service';
import * as messagesPublisher from "../../../utils/messages-publisher";

const reCaptchaKey = '6LcVtA8UAAAAAEEONePamE7B14G232zIToKOleYS';

export default class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            responseCaptcha: '',
            loading: false
        };
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    onChangeSubject(event) {
        this.setState({subject: event.target.value});
    }

    onChangeMessage(event) {
        this.setState({message: event.target.value});
    }

    onChangeCaptcha(value) {
        this.setState({responseCaptcha: value});
    }

    submit(event) {
        event.preventDefault();

        const data = {
            nome: this.state.name,
            email: this.state.email,
            assunto: this.state.subject,
            mensagem: this.state.message,
            captcha: this.state.responseCaptcha
        };

        const rules = {
            nome: 'required',
            email: 'required|email',
            assunto: 'required|min:4',
            mensagem: 'required',
            captcha: 'required'
        };

        const validator = Validator.validate(data, rules);

        if(validator.passes()) {
            this.sendMessage();
        }
        else {
            //Inserir mensagem de erro
            const errors = validator.errors;

            messagesPublisher.showMessage(...errors.get('nome'), ...errors.get('email'),
                ...errors.get('assunto'), ...errors.get('mensagem'), ...errors.get('captcha'));
        }
    }

    sendMessage() {
        this.setState({loading: true});

        
        sendMessage(this.state).then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    console.log(response.data);
                    messagesPublisher.showMessage(["Mensagem enviada com sucesso"]);
                } 
                else {
                    throw new Error(response.data);
                }

                this.setState({loading: false});
            })
            .catch((error) => {
                this.setState({loading: false});
                messagesPublisher.showMessage("Ops... Parece que estamos com alguns problemas");
            });
    }

    render() {
        const submitButton = (!this.state.loading)
            ? <Button type='submit' waves='light' className="m-t-20 w-100">Enviar</Button>
            : <Loader />;

        return (
            <div>
                <form onSubmit={this.submit.bind(this)} className="col s12 m-b-20" noValidate>
                    <Row>
                        <Input s={12} label="Nome" 
                            onChange={this.onChangeName.bind(this)}/>
                    </Row>

                    <Row>
                        <Input s={12} type="email" label="E-mail"
                            onChange={this.onChangeEmail.bind(this)}/>
                    </Row>

                    <Row>
                        <Input s={12} type="select" label="Assunto"
                            defaultValue="Dúvida" onChange={this.onChangeSubject.bind(this)}>
                            <option value="Dúvida">Dúvida</option>
                            <option value="Bug">Bug</option>
                            <option value="Parceria">Parceria</option>
                            <option value="Outro">Outro</option>
                        </Input>
                    </Row>

                    <Row>
                        <Input s={12} type="textarea" label="Mensagem"
                            onChange={this.onChangeMessage.bind(this)}/>
                    </Row>

                    <Row>
                        <Col s={12}>
                            <ReCAPTCHA ref="recaptcha" sitekey={reCaptchaKey}
                                onChange={this.onChangeCaptcha.bind(this)}
                                className="right"/>
                        </Col>
                    </Row>

                    {submitButton}
                </form>
            </div>
        )
    }
}