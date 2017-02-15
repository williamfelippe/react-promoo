import React, {Component} from 'react';
import CryptoJS from "crypto-js";
import {Row, Input, Button} from 'react-materialize';
import * as userService from '../../../services/user-service';
import * as userInformationStore from '../../../utils/user-information-store';

export default class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {currentPassword: '', newPassword: ''};
        this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
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
            user_id: userInformationStore.getLoggedId(),
            current_password: CryptoJS.MD5(this.state.currentPassword).toString(),
            new_password: CryptoJS.MD5(this.state.newPassword).toString()
        };

        console.log(data);

        userService.putPassword(data)
            .then((response) => {
                const statusCode = response.status;
                console.log(response);

                if(statusCode === 200) {
                    console.log(response.data);
                }
                else {
                    console.log('Ops...');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.submit} className="col s12">
                <Row>
                    <Input s={12} type="password" label="Senha atual"
                           onChange={this.onChangeCurrentPassword}/>
                </Row>

                <Row>
                    <Input s={12} type="password" label="Nova senha"
                           onChange={this.onChangeNewPassword}/>
                </Row>

                <Button type="submit" waves="light" className="right">
                    Alterar
                </Button>
            </form>
        )
    }
}