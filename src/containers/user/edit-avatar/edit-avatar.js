import React, {Component} from 'react';
import {Row, Col, Input} from "react-materialize";
//import ReactCrop from 'react-image-crop';
import ImageLoader from '../../../components/util/image-wrapper/image-wrapper';
import * as userInformationStore from "../../../utils/user-information-store";

export default class EditAvatar extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            userPhoto: "",
            userId: 0,
            cropping: false
        }
    }

    componentDidMount() {
        this.setState({
            userName: userInformationStore.getLoggedUserName(),
            userPhoto: userInformationStore.getLoggedUserAvatar(),
            userId: userInformationStore.getLoggedUserId()
        });
    }

    render() {
        return (
            <Row>
                <Col s={12}>
                    <div className="user-photo-container circle">
                        <ImageLoader src={this.state.userPhoto} alt={this.state.userName}
                                     className="circle responsive-img center-block"/>
                    </div>

                    <Input type="file" label="Pegar Imagem" />
                </Col>
            </Row>
        )
    }
}