import React, {Component} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {Row, Col, Input, Button} from 'react-materialize';

export default class ContactForm extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            responseCaptcha: ''
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeCaptcha = this.onChangeCaptcha.bind(this);
        this.submit = this.submit.bind(this);
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

    submit(e) {
        e.preventDefault();
        console.log('Mensagem enviada com sucesso');
        console.log(this.state);
    }

    render() {
        const reCaptchaKey = '6LcVtA8UAAAAAEEONePamE7B14G232zIToKOleYS';
        return (
            <form onSubmit={this.submit} className="col s12">
                <Row>
                    <Input s={12} label="Nome" onChange={this.onChangeName}/>
                </Row>

                <Row>
                    <Input s={12} type="email" label="E-mail" onChange={this.onChangeEmail}/>
                </Row>

                <Row>
                    <Input s={12} type="select" label="Assunto" defaultValue="Dúvida" onChange={this.onChangeSubject}>
                        <option value="Dúvida">Dúvida</option>
                        <option value="Bug">Bug</option>
                        <option value="Parceria">Parceria</option>
                        <option value="Outro">Outro</option>
                    </Input>
                </Row>

                <Row>
                    <Input s={12} type="textarea" label="Mensagem" onChange={this.onChangeMessage}/>
                </Row>

                <Row>
                    <Col s={12}>
                        <ReCAPTCHA ref="recaptcha" sitekey={reCaptchaKey} onChange={this.onChangeCaptcha} className="right"/>
                    </Col>
                </Row>

                <Button type='submit' waves='light'>Enviar</Button>
            </form>
        )
    }
}