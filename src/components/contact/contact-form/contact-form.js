import React, {Component} from 'react';
import Validator from 'Validator';
import ReCAPTCHA from 'react-google-recaptcha';
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
            responseCaptcha: ''
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
        }
        else {
            systemService.sendMessage(this.state)
                .then((response) => {
                    console.log(response.data);
                    console.log('Mensagem enviada com sucesso');
                })
                .catch((error) => {
                    console.log('CONTACT');
                    console.log(error);
                });
        }
    }

    render() {
        const reCaptchaKey = '6LcVtA8UAAAAAEEONePamE7B14G232zIToKOleYS';
        return (
            <form onSubmit={this.submit.bind(this)} className="col s12 m-b-20" noValidate>
                <Row>
                    <Input s={12} label="Nome" onChange={this.onChangeName.bind(this)}/>
                </Row>

                <Row>
                    <Input s={12} type="email" label="E-mail" onChange={this.onChangeEmail.bind(this)}/>
                </Row>

                <Row>
                    <Input s={12} type="select" label="Assunto" defaultValue="Dúvida" onChange={this.onChangeSubject.bind(this)}>
                        <option value="Dúvida">Dúvida</option>
                        <option value="Bug">Bug</option>
                        <option value="Parceria">Parceria</option>
                        <option value="Outro">Outro</option>
                    </Input>
                </Row>

                <Row>
                    <Input s={12} type="textarea" label="Mensagem" onChange={this.onChangeMessage.bind(this)}/>
                </Row>

                <Row>
                    <Col s={12}>
                        <ReCAPTCHA ref="recaptcha" sitekey={reCaptchaKey} onChange={this.onChangeCaptcha.bind(this)}
                                   className="right"/>
                    </Col>
                </Row>

                <Button type='submit' waves='light' className="m-t-20 w-100">
                    Enviar
                </Button>
            </form>
        )
    }
}