import React, {Component} from "react";
import StoreItem from "../store-item/store-item";
import {Col} from "react-materialize";

export default class StoreList extends Component {
    render() {
        const listStores = this.props.stores.map((store) =>
            <Col s={12} m={6} l={4} key={store._id}>
                <StoreItem store={store}/>
            </Col>
        );

        return(
            {listStores}
        )
    }
}