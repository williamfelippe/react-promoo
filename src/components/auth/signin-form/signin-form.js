import React, {Component} from "react";
import {Row, Input, Button} from "react-materialize";
import {browserHistory} from "react-router";
import Validator from 'Validator';
import Notification from '../../util/notification/notification';
import CryptoJS from "crypto-js";
import Loader from "../../util/loader/loader";
import * as loginService from "../../../services/auth-service";
import * as userInformationStore from "../../../utils/user-information-store";
import * as messagesPublisher from "../../../utils/messages-publisher";

export default class SigninForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false
        };
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
            email: this.state.email,
            password: this.state.password
        }

        console.log(data);

        const rules = {
            email: 'required|email',
            password: 'required|min:6'
        }

        const v = Validator.make(data, rules)
 
        if (v.fails()) {
            const errors = v.getErrors();

            console.log("SIGNIN ERROR");
            console.log(errors);

            messagesPublisher.showMessage(...errors.email, ...errors.password);
        }
        else {
            this.signin({
                email: this.state.email,
                password: CryptoJS.MD5(this.state.password).toString(),
                device_type: 'web',
                device_token: ''
            });
        }
    }

    signin(data) {
        console.log('Signin');
        console.log(data);

        this.setState({loading: true});

        loginService.signin(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    const userInformations = response.data;

                    const token = userInformations.token;
                    const user = userInformations.user;

                    userInformationStore.createUserStore(user._id, user.name, user.email,
                        user.photo, token, user.settings);

                    browserHistory.push('/');
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loading: false});
            })
            .catch((error) => {
                console.log(error);

                messagesPublisher.showMessage(["Ops... Parece que estamos com alguns problemas"]);

                this.setState({loading: false});
            });
    }

    render() {
        const submitButton = (!this.state.loading)
            ? <Button type="submit" waves="light" className="w-100 center-align">Faça parte!</Button>
            : <Loader />;

        return (
            <div>
                <form onSubmit={this.submit.bind(this)} className="col s12" noValidate>
                    <Row className="n-margin-bottom">
                        <Input s={12} type="email" onChange={this.onChangeEmail.bind(this)}
                            label="E-mail"/>
                    </Row>

                    <Row>
                        <Input s={12} type="password" onChange={this.onChangePassword.bind(this)}
                            label="Senha"/>
                    </Row>

                    {submitButton}
                </form>
                <Notification/>
            </div>
        )
    }
}