import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import ContactForm from "../../components/contact/contact-form/contact-form";

export default class Contact extends Component {
    render() {
        return (
            <Row>
                <Col s={10} m={8} offset="s1 m2">
                    <div className="container">
                        <h2 className="center-align">
                            Contato
                        </h2>

                        <p className="center-align">
                            Sed rhoncus dui metus, sit amet lobortis mauris lobortis ut. Etiam pretium dolor
                            eget elit facilisis ullamcorper. In varius imperdiet velit, sit amet bibendum
                            libero malesuada a. Nulla consectetur fermentum lacus, vitae venenatis purus
                            iaculis eget.
                        </p>

                        <ContactForm/>
                    </div>
                </Col>
            </Row>
        )
    }
}