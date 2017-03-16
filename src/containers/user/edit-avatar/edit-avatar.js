import React, {Component} from "react";
import FileProcessor from "react-file-processor";
import Cropper from "react-cropper";
import {Row, Col, Button} from "react-materialize";
import {getLoggedUserAvatar} from "../../../utils/user-information-store";
import "cropperjs/dist/cropper.css";
import "./edit-avatar.css";

export default class EditAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: getLoggedUserAvatar(),
            cropResult: null,
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

        this.setState({
            cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        });

        setInterval(() => {
            console.log('RESULT: ' + this.state.cropResult);
        }, 2000);

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
                                <Button onClick={this.useDefaultImage.bind(this)} waves="light" flat>
                                    Usar imagem padrão
                                </Button>
                            </li>
                            <li>
                                <Button onClick={this.cropImage.bind(this)} waves="light" flat>
                                    Cortar
                                </Button>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
        );
    }
}