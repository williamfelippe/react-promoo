import React, {Component} from 'react';
import "./text-loader.css";

export default class TextLoader extends Component {
    render() {
        return (
            <a onClick={this.props.onClick} className={this.props.loading ? 'moo-text-loader-more active' : 'moo-text-loader-more'}>
                {this.props.loading ? 'Carregando' : 'Carregar mais'}
            </a>
        );
    }
}