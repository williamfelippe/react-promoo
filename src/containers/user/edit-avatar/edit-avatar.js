import React, {Component} from "react";
import {Row, Col, Button} from "react-materialize";
import {browserHistory} from "react-router";
import {clearUserStore, getLoggedUserAvatar, getLoggedUserId} from "../../../utils/user-information-store";
import {putUserPhoto} from "../../../services/user-service";
import {publishMessage} from "../../../utils/messages-publisher";
import {expiredSessionError, opsInternalError} from "../../../utils/strings";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../../utils/constants";
import FileProcessor from "react-file-processor";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./edit-avatar.css";

export default class EditAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: getLoggedUserAvatar(),
            cropResult: null,
            loading: false
        };
    }

    handleClick(e) {
        this.refs.avatarInput.chooseFile();
    }

    handleFileSelect(e, files) {
        console.log(e, files);

        const reader = new FileReader();
        reader.onload = () => {
            this.setState({src: reader.result})
        };
        reader.readAsDataURL(files[0]);
    }

    onChange(event) {
        event.preventDefault();

        let files;
        if (event.dataTransfer) {
            files = event.dataTransfer.files;
        }
        else if (event.target) {
            files = event.target.files;
        }

        const reader = new FileReader();
        reader.onload = () => {
            this.setState({src: reader.result})
        };
        reader.readAsDataURL(files[0]);
    }

    cropImage() {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            console.log('Aqui');
            return;
        }

        this.setState({cropResult: this.cropper.getCroppedCanvas().toDataURL()});

        this.uploadImage({ base64_image: this.state.cropResult, user_id: getLoggedUserId() });
    }

    uploadImage(data) {
        this.setState({loading: true});

        putUserPhoto(data)
            .then((response) => {
                console.log(response);

                const status = response.status;
                if(status === REQUEST_SUCCESS) {
                    const photo = response.data;
                    console.log(photo);
                    // Trocar foto no store

                    browserHistory.push('/dashboard/usuario');
                }
                else {
                    throw new Error(response.data);
                }

                this.setState({loading: false});
            })
            .catch((error) => {
                console.log(error);

                const status = error.response.status;
                console.log(status);
                if (status && status === UNAUTHORIZED) {
                    publishMessage(expiredSessionError);

                    clearUserStore();
                    browserHistory.push('/');
                }
                else {
                    publishMessage(opsInternalError);
                    this.setState({loading: false});
                }
            });
    }

    useDefaultImage() {
        this.setState({src: getLoggedUserAvatar()});
    }

    render() {
        return (
            <div className="container moo-edit-avatar">
                <Row>
                    <Col s={12}>
                        <Cropper style={{height: 400, width: '100%'}} aspectRatio={1}
                                 preview=".img-preview" guides={false} src={this.state.src}
                                 ref={cropper => {
                                     this.cropper = cropper;
                                 }}/>
                    </Col>

                    <Col s={12}>
                        <ul className="list-buttons">
                            <li>
                                <FileProcessor ref="avatarInput" onFileSelect={this.handleFileSelect.bind(this)}>
                                    <Button waves="light" onClick={this.handleClick.bind(this)}>
                                        Pegar uma imagem
                                    </Button>
                                </FileProcessor>
                            </li>
                            <li>
                                <Button onClick={this.cropImage.bind(this)} waves="light" flat>
                                    Cortar
                                </Button>
                            </li>
                            <li>
                                <Button onClick={this.useDefaultImage.bind(this)} waves="light" flat>
                                    Usar imagem padrão
                                </Button>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
        );
    }
}