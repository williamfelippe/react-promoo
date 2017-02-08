import React, {Component} from 'react';
import {Link} from 'react-router';
import {Row, Col} from 'react-materialize';
import SignupForm from '../../../components/auth/signup-form/signup-form';
import logo from '../../../../public/images/logo.png';
import '../auth.css';

export default class Signup extends Component {
    render() {
        return (
            <div className="container h-100">
                <Row className="h-100">
                    <Col s={8} offset="s2" className="h-100">
                        <div className="moo-login-screen">
                            <Link to="/">
                                <img alt="Promoo" src={logo} className="responsive-img"/>
                            </Link>

                            <h3 className="center-align">
                                Registrar
                            </h3>

                            <SignupForm/>

                            <Row>
                                <Col s={12}>
                                    <p className="messages">
                                        Já é um membro? <Link to="signin">Entre</Link>
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}