import React, {Component} from "react";
import Loader from "../loader/loader";
import "./load-more-button.css";

export default class LoadMoreButton extends Component {
    render() {
        return (this.props.loading
            ? <Loader/>
            : <a onClick={this.props.onClick} className='moo-loader-more m-t-40'>
                Carregar mais
            </a>);
    }
}