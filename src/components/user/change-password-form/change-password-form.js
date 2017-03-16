import React, {Component} from 'react';
import CryptoJS from "crypto-js";
import {Row, Input, Button} from 'react-materialize';
import {putPassword} from '../../../services/user-service';
import {getLoggedId} from '../../../utils/user-information-store';

export default class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {currentPassword: '', newPassword: ''};
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
            user_id: getLoggedId(),
            current_password: CryptoJS.MD5(this.state.currentPassword).toString(),
            new_password: CryptoJS.MD5(this.state.newPassword).toString()
        };

        console.log(data);

        putPassword(data).then((response) => {
                const statusCode = response.status;
                console.log(response);

                if(statusCode === 200) {
                    console.log(response.data);
                }
                else {
                    throw new Error(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
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

                <Button type="submit" waves="light" className="right">
                    Alterar
                </Button>
            </form>
        )
    }
}