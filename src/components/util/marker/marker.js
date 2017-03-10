import React, {Component} from 'react';
import "./marker.css";

export default class Marker extends Component {
    render() {
        return(
            <div>
                <div className='pin bounce'></div>
                <div className='pulse'></div>
            </div>
        );
    }
}