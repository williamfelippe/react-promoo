import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import {getLoggedUserId} from "../../../utils/user-information-store";
import ImageLoader from "../../util/image-wrapper/image-wrapper";
import UserReportButton from "../user-report-button/user-report-button";
import avatar from "../../../../public/images/default_avatar.png";
import "./user-info-header.css";

export default class UserInfoHeader extends Component {
    render() {
        const {user} = this.props;
        return (
            <Row className="moo-user-header">
                <Col s={12} className="n-padding">
                    <div className="user-photo-container circle">
                        <ImageLoader placeholder={avatar} src={user.photo} alt={user.name}
                                     className="circle responsive-img center-block"/>
                    </div>

                    <h2 className="name">
                        {user.name}
                    </h2>

                    {
                        (getLoggedUserId() === user._id) &&
                        <p className="email">
                            <small>
                                {user.email}
                            </small>
                        </p>
                    }
                </Col>

                {
                    (getLoggedUserId() !== user._id) &&
                    <Col s={12} className="n-padding center-align">
                        <UserReportButton user={user}/>
                    </Col>
                }
            </Row>
        )
    }
}