import React, {Component} from 'react';
import {Row, Input, Button} from 'react-materialize';
import * as userService from '../../../services/user-service';

export default class ChangeEmailForm extends Component {
    constructor(props) {
        super(props);

        this.state = {email: ''};
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    onChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    submit(event) {
        event.preventDefault();

        userService.putEmail({email: this.state.email})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.submit} className="col s12">
                <Row>
                    <Input s={12} type="email" label="Novo e-mail" onChange={this.onChangeEmail}/>
                </Row>

                <Button type="submit" waves="light" className="right">
                    Alterar
                </Button>
            </form>
        )
    }
}