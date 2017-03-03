import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import Validator from 'Validator';
import ReCAPTCHA from 'react-google-recaptcha';
import Notification from '../../util/notification/notification';
import Loader from "../../util/loader/loader";
import {Row, Col, Input, Button} from 'react-materialize';
import * as systemService from '../../../services/system-service';

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

        console.log(this.state);

        const rules = {
            name: 'required',
            email: 'required|email',
            subject: 'required|min:4',
            message: 'required',
            responseCaptcha: 'required'
        }

        const v = Validator.make(this.state, rules)

        if (v.fails()) {
            //Inserir mensagem de erro
            const errors = v.getErrors();

            console.log("CONTACT ERROR");
            console.log(errors);

            errors.name.map((error) => PubSub.publish('show-message', error));
            errors.email.map((error) => PubSub.publish('show-message', error));
            errors.subject.map((error) => PubSub.publish('show-message', error));
            errors.message.map((error) => PubSub.publish('show-message', error));
            errors.responseCaptcha.map((error) => PubSub.publish('show-message', error));
        }
        else {
            this.sendMessage();
        }
    }

    sendMessage() {
        this.setState({loading: true});

        systemService
            .sendMessage(this.state)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    console.log(response.data);
                    console.log('Mensagem enviada com sucesso');
                } 
                else {
                    throw new Error(response.data);
                }

                this.setState({loading: false});
            })
            .catch((error) => {
                console.log('CONTACT');
                console.log(error);

                this.setState({loading: false});
                
                PubSub.publish('show-message', "Ops... Parece que estamos com alguns problemas.");
            });
    }

    render() {
        const reCaptchaKey = '6LcVtA8UAAAAAEEONePamE7B14G232zIToKOleYS';

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
                <Notification/>
            </div>
        )
    }
}