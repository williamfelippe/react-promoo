import React, {Component} from 'react';
import './loader.css';

export default class Loader extends Component {
    render() {
        return (
            <div className="loader">
                <span className="dot dot_1"></span>
                <span className="dot dot_2"></span>
                <span className="dot dot_3"></span>
                <span className="dot dot_4"></span>
            </div>
        )
    }
}