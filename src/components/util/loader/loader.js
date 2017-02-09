import React, {Component} from 'react';
import './loader.css';

export default class Loader extends Component {
    render() {
        return (
            <a onClick={this.props.onClick} className={this.props.loading ? 'moo-loader-more active' : 'moo-loader-more'}>
                {this.props.loading ? 'Carregando' : 'Carregar mais'}
            </a>
        );
    }
}