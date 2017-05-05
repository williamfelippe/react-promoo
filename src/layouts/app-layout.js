import React, {Component} from "react";
import Notification from "../components/util/notification/notification";

export default class App extends Component {
    render () {
        return (
            <div>
                {this.props.children}
                <Notification/>
            </div>
        );
    }
}