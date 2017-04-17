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
                            O Promoo chegou com a intenção de ajudar a diminuir seus gastos nas compras de supermercado.
                            Porém para isso necessitamos da ajuda de vocês. Então você pode usar esse formulário aí e nos
                            indicar problemas, sugerir mudanças ou ainda propondo uma parceria para fazer com que essa iniciativa
                            se espalhe por todo o Brasil.
                        </p>

                        <p className="moo-contact-text">
                            <strong className="highlight">
                                Deixe um recado aí! Responderemos rapidamente.
                            </strong>
                        </p>

                        <ContactForm/>
                    </div>
                </Col>
            </Row>
        )
    }
}