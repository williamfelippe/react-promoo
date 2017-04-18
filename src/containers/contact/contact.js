import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import ContactForm from "../../components/contact/contact-form/contact-form";
import "./contact.css"

export default class Contact extends Component {
    render() {
        return (
            <Row>
                <Col s={10} m={8} offset="s1 m2" className="center-align">
                    <div className="container">
                        <h2>
                            Contato
                        </h2>

                        <p className="moo-contact-text">
                            O Promoo chegou pra te ajudar a economizar no supermercado. Mas precisamos da
                            sua ajuda para alcançar mais pessoas! Que tal ser um de nossos parceiros e
                            espalhar essa ideia pelo Brasil afora?! Críticas ou sugestões também são muito
                            bem vindas.
                        </p>

                        <p className="moo-contact-text">
                            <strong className="highlight">
                                Entre em contato com a gente através do formulário abaixo e nós te responderemos rapidinho!
                            </strong>
                        </p>

                        <ContactForm/>
                    </div>
                </Col>
            </Row>
        )
    }
}