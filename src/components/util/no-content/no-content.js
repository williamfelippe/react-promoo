import React, {Component} from "react";
import "./no-content.css";

export default class NoContent extends Component {
    render() {
        return (
            <div className="moo-no-offer">
                <p>
                    {this.props.message}
                </p>
            </div>
        );
    }
}
