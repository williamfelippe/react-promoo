import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import ChangeEmailForm from '../../../components/change-email-form/change-email-form';

export default class EditEmail extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={12} m={8} offset="m2">
                        <Row>
                            <Col s={12}>
                                <h5 className="center-align">
                                    Alterar e-mail
                                </h5>
                            </Col>

                            <ChangeEmailForm />
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}