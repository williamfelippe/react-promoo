import React, {Component} from "react";
import {Row, Col} from "react-materialize";
import ImageLoader from "../../util/image-loader/image-loader";
import UserReportButton from "../user-report-button/user-report-button";
import "./user-info-header.css";

export default class UserInfoHeader extends Component {
    render() {
        return (
            <Row className="moo-user-header">
                <Col s={12} className="n-padding">
                    <div className="user-photo-container circle">
                        <ImageLoader src={this.props.user.photo} alt={this.props.user.name}
                                     className="circle responsive-img center-block"/>
                    </div>

                    <h2 className="name">
                        {this.props.user.name}
                    </h2>

                    <p className="email">
                        <small>
                            {this.props.user.email}
                        </small>
                    </p>
                </Col>

                <Col s={12} className="n-padding center-align">
                    <UserReportButton user={this.props.user}/>
                </Col>
            </Row>
        )
    }
}
