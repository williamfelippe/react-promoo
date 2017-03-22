/* eslint-disable no-undef */
import React, {Component} from "react";
import {Input} from "react-materialize";
import PlacesAutocomplete from "react-places-autocomplete";

export default class StreetSuggest extends Component {
    render() {
        const options = {
            location: new google.maps.LatLng(this.props.lat, this.props.lng),
            radius: 2000,
            types: ['address']
        };

        return (
            <PlacesAutocomplete
                value={this.props.address}
                onChange={this.props.onChangeAddress}
                onSelect={this.props.onSelectAddress}
                options={options}
                placeholder="&nbsp;"
                hideLabel>
                <Input s={12} label="Procurar por endereço" className="m-l-20 m-r-20"/>
            </PlacesAutocomplete>
        );
    }
}
