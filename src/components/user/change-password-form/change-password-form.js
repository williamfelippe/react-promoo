import React, {Component} from "react";
import {Button, Input, Row} from "react-materialize";
import {putPassword} from "../../../services/user-service";
import {validate} from "../../../utils/validator";
import {clearUserStore, getLoggedUserId} from "../../../utils/user-information-store";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../../utils/constants";
import {browserHistory} from "react-router";
import {publishMessage} from "../../../utils/messages-publisher";
import {expiredSessionError, opsInternalError} from "../../../utils/strings";
import CryptoJS from "crypto-js";
import Loader from "../../util/loader/loader";

export default class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: '',
            newPassword: '',
            loading: false
        };
    }

    onChangeCurrentPassword(event) {
        this.setState({currentPassword: event.target.value});
    }

    onChangeNewPassword(event) {
        this.setState({newPassword: event.target.value});
    }

    submit(event) {
        event.preventDefault();

        const data = {
            "senha atual": this.state.currentPassword,
            "nova senha": this.state.newPassword
        };

        const rules = {
            "senha atual": 'required|min:6',
            "nova senha": 'required|min:6'
        };

        const validator = validate(data, rules);

        if(validator.passes())
        {
            this.submitChangePassword({
                user_id: getLoggedUserId(),
                current_password: CryptoJS.MD5(this.state.currentPassword).toString(),
                new_password: CryptoJS.MD5(this.state.newPassword).toString()
            });
        }
        else {
            const errors = validator.errors;
            publishMessage(
                ...errors.get('senha atual'),
                ...errors.get('nova senha')
            );
        }
    }

    submitChangePassword(data) {
        this.setState({loading: true});

        putPassword(data)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === REQUEST_SUCCESS) {
                    browserHistory.push('/dashboard/usuario');
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loading: false});
            })
            .catch((error) => {
                const status = error.response.status;

                if (status && status === UNAUTHORIZED) {
                    publishMessage(expiredSessionError);

                    clearUserStore();
                    browserHistory.push('/');
                }
                else {
                    publishMessage(opsInternalError);
                    this.setState({loading: false});
                }
            });
    }

    render() {
        const submitButton = (!this.state.loading)
            ? <Button type="submit" waves="light" className="right">Alterar</Button>
            : <Loader />;

        return (
            <form onSubmit={this.submit.bind(this)} className="col s12">
                <Row>
                    <Input s={12} type="password" label="Senha atual"
                           onChange={this.onChangeCurrentPassword.bind(this)}/>
                </Row>

                <Row>
                    <Input s={12} type="password" label="Nova senha"
                           onChange={this.onChangeNewPassword.bind(this)}/>
                </Row>

                {submitButton}
            </form>
        )
    }
}