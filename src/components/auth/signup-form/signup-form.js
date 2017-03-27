import React, {Component} from "react";
import {Row, Input, Button} from "react-materialize";
import {browserHistory} from "react-router";
import CryptoJS from "crypto-js";
import Loader from "../../util/loader/loader";
import {signup} from "../../../services/auth-service";
import {validate} from '../../../utils/validator';
import {createUserStore} from "../../../utils/user-information-store";
import {publishMessage} from "../../../utils/messages-publisher";

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
            nome: this.state.name,
            email: this.state.email,
            senha: this.state.password
        };

        const rules = {
            nome: 'required',
            email: 'required|email',
            senha: 'required|min:6'
        };

        const validator = validate(data, rules);

        if(validator.passes())
        {
            this.submitSignup({
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

            publishMessage(
                ...errors.get('nome'),
                ...errors.get('email'),
                ...errors.get('senha')
            );
        }
    }

    submitSignup(data) {
        this.setState({loading: true});

        signup(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    const userInformations = response.data;

                    const token = userInformations.token;
                    const user = userInformations.user;

                    createUserStore(user._id, user.name, user.email, user.photo, token, user.settings);
                    browserHistory.push('/');
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loading: false});
            })
            .catch((error) => {
                console.log(error);

                publishMessage("Ops... Parece que estamos com alguns problemas");

                this.setState({loading: false});
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