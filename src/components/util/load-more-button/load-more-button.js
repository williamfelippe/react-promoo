import React, {Component} from 'react';
import Loader from "../loader/loader";
import "./load-more-button.css";

export default class LoadMoreButton extends Component {
    render() {
        return (
            this.props.loading ? <Loader /> :
            <p className="center-align m-t-20">
                <a onClick={this.props.onClick} className='moo-loader-more'>
                    Carregar mais
                </a>
            </p>
        );
    }
}