import React, {Component} from "react";
import {Row, Input, Button} from "react-materialize";
import Validator from 'Validator';
import Loader from "../../util/loader/loader";
import * as loginService from "../../../services/auth-service";
import SnackBar from 'react-material-snackbar';

export default class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            showErrorMessage: false,
            errorMessage: ''
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

        const v = Validator.make(data, rules)

        if (v.fails()) {
            this.setState({
                errorMessage: "Ops... Dê uma olhadinha no campo de e-mail",
                showErrorMessage: true
            });
        }
        else {
            loginService
                .forgotPassword(data)
                .then((response) => {
                    const statusCode = response.status;

                    if (statusCode === 200) {
                        console.log('Senha alterada com sucesso');
                        console.log(response.data);
                    }
                    else {
                        throw new Error(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error);

                    this.setState({
                        errorMessage: "Ixi!! Talvez esteja ocorrendo algum probleminha conosco",
                        showErrorMessage: true
                    });
                });
        }
    }

    render() {
        const submitButton = (!this.state.loading)
            ? <Button type="submit" waves="light" className="w-100 center-align">Enviar instruções</Button>
            : <Loader/>;

        return (
            <div>
                <form onSubmit={this.submit.bind(this)} className="col s12" noValidate>
                    <Row>
                        <Input s={12} type="email" 
                            onChange={this.onChangeEmail.bind(this)} label="E-mail"/>
                    </Row>

                    {submitButton}
                </form>
                <SnackBar actionText="fechar" show={this.state.showErrorMessage} snackBarText={this.state.errorMessage}  timer={2000} />
            </div>
        )
    }
}