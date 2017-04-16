import React, {Component} from "react";
import {Button, Input, Row} from "react-materialize";
import {putEmail} from "../../../services/user-service";
import {validate} from "../../../utils/validator";
import {clearUserStore, getLoggedUserId} from "../../../utils/user-information-store";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../../utils/constants";
import {expiredSessionError, opsInternalError} from "../../../utils/strings";
import {browserHistory} from "react-router";
import {publishMessage} from "../../../utils/messages-publisher";
import Loader from "../../util/loader/loader";

export default class ChangeEmailForm extends Component {
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

        if(validator.passes())
        {
            this.submitChangeEmail({
                user_id: getLoggedUserId(),
                email: this.state.email
            });
        }
        else {
            const errors = validator.errors;
            publishMessage(
                ...errors.get('email'),
                ...errors.get('senha')
            );
        }
    }

    submitChangeEmail(data) {
        this.setState({loading: true});

        putEmail(data)
            .then((response) => {
                const statusCode = response.status;
                if (statusCode === REQUEST_SUCCESS) {
                    browserHistory.push('/dashboard/usuario');
                }
                else {
                    throw new Error(response.data);
                }
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
                    <Input s={12} type="email" label="Novo e-mail" onChange={this.onChangeEmail.bind(this)}/>
                </Row>

                {submitButton}
            </form>
        )
    }
}