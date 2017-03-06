import React, {Component} from "react";
import {Row, Input, Button} from "react-materialize";
import {browserHistory} from "react-router";
import CryptoJS from "crypto-js";
import Loader from "../../util/loader/loader";
import * as Validator from '../../../utils/validator';
import * as loginService from "../../../services/auth-service";
import * as userInformationStore from "../../../utils/user-information-store";
import * as messagesPublisher from "../../../utils/messages-publisher";

export default class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            loading: false
        };
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    onChangePassword(event) {
        this.setState({password: event.target.value});
    }

    submit(event) {
        event.preventDefault();

        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        const rules = {
            name: 'required',
            email: 'required|email',
            password: 'required|min:6'
        };

        const validator = Validator.validate(data, rules);

        if(validator.passes())
        {
            this.signup({
                name: this.state.name,
                email: this.state.email,
                password: CryptoJS.MD5(this.state.password).toString(),
                device_type: 'web',
                device_token: ''
            });
        }
        else {
            //Inserir mensagem de erro
            const errors = validator.errors;

            console.log("SIGNUP ERROR");
            console.log(errors);

            messagesPublisher.showMessage(...errors.get('name'), ...errors.get('email'), ...errors.get('password'));
        }
    }

    signup(data) {
        this.setState({loading: true});

        loginService.signup(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    const userInformations = response.data;

                    const token = userInformations.token;
                    const user = userInformations.user;

                    userInformationStore.createUserStore(user._id, user.name, user.email, user.photo, token, user.settings);
                    browserHistory.push('/');
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
            ? <Button type="submit" waves="light" className="w-100 center-align">Cadastrar</Button>
            : <Loader />;

        return (
            <div>
                <form onSubmit={this.submit.bind(this)} className="col s12" noValidate>
                    <Row className="n-margin-bottom">
                        <Input s={12} label="Nome" onChange={this.onChangeName.bind(this)}/>
                    </Row>

                    <Row className="n-margin-bottom">
                        <Input s={12} type="email" label="E-mail"
                            onChange={this.onChangeEmail.bind(this)}/>
                    </Row>

                    <Row className="n-margin-bottom">
                        <Input s={12} type="password" label="Senha"
                            onChange={this.onChangePassword.bind(this)}/>
                    </Row>

                    {submitButton}
                </form>
            </div>
        )
    }
}