import React, {Component} from 'react';
import {Link} from 'react-router';
import SignupForm from '../../../partials/signup-form/signup-form';
import logo from '../../../../../public/images/logo.png';
import '../auth.css';

export default class Signup extends Component {
  render() {
    return (
      <div className="container h-100">
        <div className="row h-100">
          <div className="col s8 col offset-s2 h-100">
            <div className="moo-login-screen">
              <Link to="/">
                <img alt="Promoo" src={logo} className="responsive-img"/>
              </Link>

              <h3 className="center-align">
                Registrar
              </h3>

              <SignupForm/>

              <div className="row">
                <div className="col s12">
                  <p className="messages">
                    Já é um membro? <Link to="/signin">Entre</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}