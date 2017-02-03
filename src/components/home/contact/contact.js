import React, {Component} from 'react';
import {Link} from 'react-router';
import './contact.css';

export default class Contact extends Component {
    render() {
        return (
            <div className="row moo-home-contact">
                <div className="col s12">
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m8">
                                <p>
                                    Tem alguma dúvida? Viu algum bug em nossos aplicativos? Quer ser nosso parceiro?
                                    Quer apenas parabenizar pelo trabalho?
                                </p>
                                <p>
                                    Clica aí do lado e deixa um recado.<br/>
                                    Responderemos prontamente ;)
                                </p>
                            </div>
                            <div className="col s12 m4">
                                <Link to="/contact" className="waves-effect waves-light btn btn-large">
                                    Fale conosco
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}