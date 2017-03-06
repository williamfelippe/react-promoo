import React, {Component} from 'react';

export default class ImageWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errored: false
        }
    }

    onError() {
        this.setState({errored: true});
    }

    render() {
        if (this.state.errored) {
            return <img src={this.props.placeholder} alt={this.props.alt} className={this.props.className}/>;
        }
        else {
            return <img onError={this.onError.bind(this)} src={this.props.src}
                        alt={this.props.alt} className={this.props.className}/>;
        }
    }
}