import React, {Component} from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
                <ReactCSSTransitionGroup 
                    transitionName="list-animations"
                    transitionAppear={true}
                    transitionAppearTimeout={400}
                    transitionEnterTimeout={400} 
                    transitionLeaveTimeout={300}>
                    {listStores}
                </ReactCSSTransitionGroup>
            </ul>
        )
    }
}