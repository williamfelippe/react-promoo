import React, {Component} from "react";
import {Icon, Col, CardPanel} from 'react-materialize';
import * as dateFormat from '../../../utils/date-format';
import * as currencyFormat from '../../../utils/currency-format';
import * as offerService from '../../../services/offer-service';
import * as userInformationStore from '../../../utils/user-information-store';
import "./store-item.css";

export default class StoreItem extends Component {
    render() {
        return (
            <Col s={this.props.s} m={this.props.m} l={this.props.l}>
                <CardPanel className="moo-store-card">
                </CardPanel>
            </Col>
        );
    }
}
