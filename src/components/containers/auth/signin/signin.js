import React, {Component} from 'react';
import {Link} from 'react-router';
import SigninForm from '../../../partials/signin-form/signin-form';
import logo from '../../../../../public/images/logo.png';
import '../auth.css';

export default class Signin extends Component {
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
                Entrar
              </h3>

              <SigninForm/>

              <div className="row">
                <div className="col s12 m5">
                  <p className="messages">
                    <Link to="/forgot-password">
                      Esqueceu sua senha?
                    </Link>
                  </p>
                </div>
                <div className="col s12 m7">
                  <p className="messages">
                    Não é registrado? <Link to="/signup">Registre-se</Link>
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