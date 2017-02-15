import React, {Component} from "react";
import {Row, Col, Button, Dropdown, NavItem} from "react-materialize";
import {browserHistory} from "react-router";
import * as userInformationStore from "../../../utils/user-information-store";

export default class OfferInformationBar extends Component {
    redirectToCreateOfferPage() {
        browserHistory.push((userInformationStore.isLoggedIn())
            ? 'dashboard/create-offer'
            : 'signin');
    }

    render() {
        return (
            <Col s={12} className="n-padding">
                <Row className="moo-add-bar">
                    <div className="container">
                        <Col s={6}>
                            <b>{this.props.amount} ofertas encontradas</b>
                        </Col>
                        <Col s={6} className="right-align">
                            <div>
                                <Button onClick={this.redirectToCreateOfferPage.bind(this)} waves='light'
                                        className="m-r-20">
                                    Divulgar
                                </Button>
                                <Dropdown trigger={<Button flat waves="light">Ordenar</Button>}>
                                    <NavItem>Nome</NavItem>
                                    <NavItem>Categoria</NavItem>
                                    <NavItem>Preço</NavItem>
                                </Dropdown>
                            </div>
                        </Col>
                    </div>
                </Row>
            </Col>
        )
    }
}