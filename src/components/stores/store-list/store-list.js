import React, {Component} from "react";
import StoreItem from "../store-item/store-item";
import "./store-list.css";

export default class StoreList extends Component {
    render() {
        const listStores = this.props.stores.map((store) =>
            <li key={store._id}>
                <StoreItem store={store}/>
            </li>
        );

        return (
            <ul className="moo-store-list">
                {listStores}
            </ul>
        )
    }
}