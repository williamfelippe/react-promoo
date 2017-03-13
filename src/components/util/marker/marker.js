import React, {Component} from 'react';
import {Icon} from "react-materialize";
import "./marker.css";

export default class Marker extends Component {
    render() {
        return (
            <Icon className="moo-map-marker">
                place
            </Icon>
        );
    }
}