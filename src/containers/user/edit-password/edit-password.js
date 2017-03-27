import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import ChangePasswordForm from "../../../components/user/change-password-form/change-password-form";

export default class EditPassword extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={12} m={8} offset="m2">
                        <Row>
                            <Col s={12}>
                                <h5 className="center-align">
                                    Trocar senha
                                </h5>
                            </Col>

                            <ChangePasswordForm />
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}