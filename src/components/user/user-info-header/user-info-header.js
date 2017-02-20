import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import ImageLoader from "../../util/image-loader/image-loader";
import UserReportButton from "../user-report-button/user-report-button";
import * as userInformationStore from "../../../utils/user-information-store";
import "./user-info-header.css";

export default class UserInfoHeader extends Component {
    render() {
        const {user} = this.props;
        return (
            <Row className="moo-user-header">
                <Col s={12} className="n-padding">
                    <div className="user-photo-container circle">
                        <ImageLoader src={user.photo} alt={user.name}
                                     className="circle responsive-img center-block"/>
                    </div>

                    <h2 className="name">
                        {this.props.user.name}
                    </h2>

                    <p className="email">
                        <small>
                            {user.email}
                        </small>
                    </p>
                </Col>

                {
                    (userInformationStore.getLoggedUserId() !== user._id) &&
                    <Col s={12} className="n-padding center-align">
                        <UserReportButton user={user}/>
                    </Col>
                }
            </Row>
        )
    }
}