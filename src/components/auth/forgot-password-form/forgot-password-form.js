import React, {Component} from "react";
import {Row, Input, Button} from "react-materialize";
import Validator from 'Validator';
import Loader from "../../util/loader/loader";
import * as loginService from "../../../services/auth-service";

export default class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {email: ''};
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

        const v = Validator.make(data, rules)
 
        if (v.fails()) {
            //Inserir mensagem de erro
        }
        else {
            loginService
                .forgotPassword(data)
                .then((response) => {
                    console.log('Senha alterada com sucesso');
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        const submitButton = (!this.state.loading)
            ? <Button type="submit" waves="light" className="w-100 center-align">Enviar instruções</Button>
            : <Loader />;

        return (
            <form onSubmit={this.submit.bind(this)} className="col s12" noValidate>
                <Row>
                    <Input s={12} type="email" onChange={this.onChangeEmail.bind(this)} label="E-mail" />
                </Row>

                {submitButton}
            </form>
        )
    }
}