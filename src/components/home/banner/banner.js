import React, {Component} from 'react';
import {Link} from 'react-router';
import logo from '../../../../../public/images/logo.png';
import './banner.css';

export default class Banner extends Component {
    render() {
        return (
            <header>
                <div className="row moo-home-banner">
                    <div className="col s12 center-align">

                        <img alt="Promoo" src={logo} className="responsive-img logo"/>

                        <h1>Viu uma promoção?</h1>
                        <p>Ajude outras pessoas a realizar uma compra mais barata.</p>
                        <p>
                            <Link to="/dashboard" className="waves-effect waves-light btn btn-large">
                                Indique aqui
                            </Link>
                        </p>
                    </div>
                </div>
            </header>
        )
    }
}