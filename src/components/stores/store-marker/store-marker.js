import React, {Component} from "react";
import ImageWrapper from "../../util/image-wrapper/image-wrapper";
import marker from "../../../../public/images/marker.png";
import "./store-marker.css";

export default class StoreMarker extends Component {
    render() {
        return(
            <ImageWrapper src={marker} alt={this.props.name} className="moo-store-marker" />
        )
    }
}