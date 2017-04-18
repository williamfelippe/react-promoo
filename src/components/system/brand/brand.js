import React, {Component} from "react";
import {Link} from "react-router";
import "./brand.css";

export default class Brand extends Component {
    render() {
        return (
            <div className="valign-wrapper">
                <Link to="/" className="moo-logo-text">
                    <h4 className="center-align valign">
                        pro<span>MOO</span>
                    </h4>
                </Link>
            </div>
        );
    }
}