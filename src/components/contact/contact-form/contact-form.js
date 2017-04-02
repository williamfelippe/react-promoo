import React, {Component} from "react";
import {Button, Col, Input, Row} from "react-materialize";
import {sendMessage} from "../../../services/system-service";
import {publishMessage} from "../../../utils/messages-publisher";
import {messageSendedSuccess, opsInternalError} from "../../../utils/strings";
import {REQUEST_SUCCESS} from "../../../utils/constants";
import {validate} from "../../../utils/validator";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "../../util/loader/loader";

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

        const validator = validate(data, rules);

        if(validator.passes()) {
            this.sendMessage();
        }
        else {
            //Inserir mensagem de erro
            const errors = validator.errors;

            publishMessage(
                ...errors.get('nome'),
                ...errors.get('email'),
                ...errors.get('assunto'),
                ...errors.get('mensagem'),
                ...errors.get('captcha')
            );
        }
    }

    sendMessage() {
        this.setState({loading: true});

        sendMessage(this.state).then((response) => {
                const statusCode = response.status;

                if (statusCode === REQUEST_SUCCESS) {
                    console.log(response.data);
                    publishMessage(messageSendedSuccess);
                } 
                else {
                    throw new Error(response.data);
                }

                this.setState({loading: false});
            })
            .catch((error) => {
                console.log(error);

                this.setState({loading: false});
                publishMessage(opsInternalError);
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
                            defaultValue="" onChange={this.onChangeSubject.bind(this)}>
                            <option value="" disabled>No que podemos ajudar?</option>
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