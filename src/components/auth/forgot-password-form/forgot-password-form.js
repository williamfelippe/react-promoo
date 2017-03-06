import React, {Component} from "react";
import {Row, Input, Button} from "react-materialize";
import Loader from "../../util/loader/loader";
import * as Validator from "../../../utils/validator";
import * as loginService from "../../../services/auth-service";
import * as messagesPublisher from "../../../utils/messages-publisher";

export default class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            loading: false
        };
    }

    onChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    submit(event) {
        event.preventDefault();

        const data = {
            email: this.state.email
        };

        const rules = {
            email: 'required|email'
        }

        const validator = Validator.validate(data, rules);

        if(validator.passes())
        {
            this.sendEmail(data);
        }
        else {
            const errors = validator.errors;
            messagesPublisher.showMessage(...errors.get('email'));
        } 
    }

    sendEmail(data) {
        this.setState({loading: true});

        loginService
            .forgotPassword(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    console.log(response.data);
                    messagesPublisher.showMessage(["Senha alterada com sucesso"]);
                } 
                else {
                    throw new Error(response.data);
                }

                this.setState({loading: false});
            })
            .catch((error) => {
                console.log(error);

                this.setState({loading: false});

                messagesPublisher.showMessage(["Ops... Parece que estamos com alguns problemas"]);
            });
    }

    render() {
        const submitButton = (!this.state.loading)
            ? <Button type="submit" waves="light" className="w-100 center-align">Enviar instruções</Button>
            : <Loader/>;

        return (
            <div>
                <form onSubmit={this.submit.bind(this)} className="col s12" noValidate>
                    <Row>
                        <Input s={12} type="email" onChange={this.onChangeEmail.bind(this)} label="E-mail"/>
                    </Row>

                    {submitButton}
                </form>
            </div>
        )
    }
}