import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import "./about.css";

export default class About extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={10} m={8} offset="s1 m2" className="moo-about-text center-align">
                        <h2>Sobre</h2>

                        <p>
                            O Promoo surgiu em um momento bem família, quando sogro e genro conversavam
                            sobre promoções de supermercado. Sabendo que economizar é algo que todo mundo
                            gosta, mas ninguém tem tempo para pesquisar preços em vários lugares, um grupo
                            de amigos programadores se inspirou nessa conversa e decidiu simplificar essa burocracia da
                            vida adulta.
                        </p>

                        <h5>
                            Mas como funciona?
                        </h5>

                        <p>
                            É muito fácil! Basta escolher a cidade, o tipo de produto ou o supermercado desejado para
                            filtrar as promoções e descobrir onde estão os melhores preços. Assim você
                            garante as melhores ofertas e pode ter mais tempo livre para o que realmente
                            importa.
                        </p>

                        <h4>
                            Não perca tempo e experimente essa novidade
                        </h4>
                    </Col>
                </Row>
            </div>
        )
    }
}