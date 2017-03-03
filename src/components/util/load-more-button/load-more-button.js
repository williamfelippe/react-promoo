import React, {Component} from 'react';
import "./load-more-button.css";

export default class LoadMoreButton extends Component {
    render() {
        return (
            <a onClick={this.props.onClick} className='moo-loader-more'>
                Carregar mais
            </a>
        );
    }
}