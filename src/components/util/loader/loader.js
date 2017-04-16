import React, {Component} from "react";
import "./loader.css";

export default class Loader extends Component {
    render() {
        return (
            <div className={`loader ${this.props.className}`}>
                <span className="dot dot_1"/>
                <span className="dot dot_2"/>
                <span className="dot dot_3"/>
                <span className="dot dot_4"/>
            </div>
        )
    }
}