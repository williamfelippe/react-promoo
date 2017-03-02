import React, {Component} from 'react';
import {Row, Input, Button} from 'react-materialize';
import * as userService from '../../../services/user-service';
import * as userInformationStore from '../../../utils/user-information-store';

export default class ChangeEmailForm extends Component {
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
            user_id: userInformationStore.getLoggedUserId(),
            email: this.state.email
        };
        
        userService.putEmail(data)
            .then((response) => {
                const statusCode = response.status;
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
                    <Input s={12} type="email" label="Novo e-mail" onChange={this.onChangeEmail.bind(this)}/>
                </Row>

                <Button type="submit" waves="light" className="right">
                    Alterar
                </Button>
            </form>
        )
    }
}