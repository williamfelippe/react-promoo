import React, {Component} from 'react';
import avatar from '../../../../public/images/default_avatar.png';

export default class ImageLoader extends Component {
    constructor(props) {
        super(props);

        this.state = { src: this.props.src };

        this.onError = this.onError.bind(this);
    }

    onError() {
        //const type = this.props.type;
        this.setState({ src: avatar });
    }

    render() {
        return (
            <img onError={this.onError} src={this.state.src} alt={this.props.alt} className={this.props.className} />
        );
    }
}