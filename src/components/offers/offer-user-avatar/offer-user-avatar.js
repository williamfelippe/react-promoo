import React, {Component} from "react";
import {Link} from "react-router";
import ImageWrapper from "../../util/image-wrapper/image-wrapper";
import avatar from "../../../../public/images/default_avatar.png";

export default class OfferUserAvatar extends Component {
    render() {
        const {user} = this.props;

        return (
            <Link to={`detalhes-usuario/${user._id}`} className={this.props.className}>
                <div className="right valign-wrapper">
                    <ImageWrapper placeholder={avatar} src={user.photo}
                        alt={user.name} className="circle responsive-img right"/>

                    <p className="right">
                        {user.name}
                    </p>
                </div>
                <div className="clearfix"></div>
            </Link>

        )
    }
}