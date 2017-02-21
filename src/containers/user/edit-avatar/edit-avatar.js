import React, {Component} from 'react';
import {Row, Col, Button} from "react-materialize";
import ReactCrop from 'react-image-crop';
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
                        <ImageLoader src={user.photo} alt={user.name}
                                     className="circle responsive-img center-block"/>
                    </div>

                    <Button type="file" waves="light">
                        Pegar imagem
                    </Button>
                </Col>
            </Row>
        )
    }
}