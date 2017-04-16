import React, {Component} from "react";
import {Row, Input, Button} from "react-materialize";
import {browserHistory} from "react-router";
import {validate} from "../../../utils/validator";
import {forgotPassword} from "../../../services/auth-service";
import {publishMessage} from "../../../utils/messages-publisher";
import {opsInternalError, passwordChangedSuccess} from "../../../utils/strings";
import {REQUEST_SUCCESS} from "../../../utils/constants";
import Loader from "../../util/loader/loader";

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
        };

        const validator = validate(data, rules);

        if(validator.passes()) {
            this.sendEmail(data);
        }
        else {
            const errors = validator.errors;
            publishMessage(...errors.get('email'));
        } 
    }

    sendEmail(data) {
        this.setState({loading: true});

        forgotPassword(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === REQUEST_SUCCESS) {
                    publishMessage(passwordChangedSuccess);
                    browserHistory.push('entrar');
                } 
                else {
                    throw new Error(response.data);
                }
            })
            .catch((error) => {
                this.setState({loading: false});
                publishMessage(opsInternalError);
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