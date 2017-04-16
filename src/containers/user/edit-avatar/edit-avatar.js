import React, {Component} from "react";
import {Col, Icon, Row} from "react-materialize";
import {browserHistory} from "react-router";
import {publishMessage} from "../../../utils/messages-publisher";
import {putUserPhoto} from "../../../services/user-service";
import {expiredSessionError, opsInternalError} from "../../../utils/strings";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../../utils/constants";
import {
    clearUserStore,
    getLoggedUserAvatar,
    getLoggedUserId,
    setLoggedUserAvatar
} from "../../../utils/user-information-store";
import Cropper from "react-cropper";
import ReactTooltip from "react-tooltip";
import FileProcessor from "react-file-processor";
import Loader from "../../../components/util/loader/loader";
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

    handleClick() {
        //noinspection JSUnresolvedVariable
        this.refs.avatarInput.chooseFile();
    }

    //noinspection JSUnusedLocalSymbols
    handleFileSelect(event, files) {
        const reader = new FileReader();
        reader.onload = () => this.setState({src: reader.result});
        reader.readAsDataURL(files[0]);
    }

    async cropImage() {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }

        let cropResult = await this.cropper.getCroppedCanvas().toDataURL();

        this.setState({cropResult});

        this.uploadImage({
            base64_image: this.state.cropResult,
            user_id: getLoggedUserId()
        });
    }

    uploadImage(data) {
        this.setState({loading: true});

        console.log("DATA");
        console.log(data);

        putUserPhoto(data)
            .then((response) => {
                console.log(response);

                const status = response.status;
                if (status === REQUEST_SUCCESS) {
                    const {photo} = response.data;
                    console.log(`Photo: ${photo}`);

                    // Trocar foto no store
                    setLoggedUserAvatar(photo);

                    browserHistory.push('/dashboard/usuario');
                }
                else {
                    throw new Error(response.data);
                }
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

        let renderButtonsOrLoader = null;

        if (this.state.loading) {
            renderButtonsOrLoader = <Loader className="m-t-40"/>
        }
        else {
            renderButtonsOrLoader =
                <ul className="list-buttons">
                    <li data-tip="Pegue uma nova imagem">
                        <FileProcessor ref="avatarInput"
                                       onFileSelect={this.handleFileSelect.bind(this)}>
                            <a onClick={this.handleClick.bind(this)}>
                                <Icon>add_a_photo</Icon>
                            </a>
                        </FileProcessor>
                    </li>

                    <li data-tip="Voltar a foto padrão">
                        <a onClick={this.useDefaultImage.bind(this)}>
                            <Icon>photo</Icon>
                        </a>
                    </li>

                    <li data-tip="Cortar e salvar">
                        <a onClick={this.cropImage.bind(this)} className="crop">
                            <Icon>crop</Icon>
                        </a>
                    </li>
                    <ReactTooltip place="bottom" type="dark" effect="solid"/>
                </ul>
        }

        return (
            <div className="container moo-edit-avatar">
                <Row>
                    <Col s={12}>
                        <Cropper style={{height: 400, width: '100%'}} aspectRatio={1}
                                 preview=".img-preview" guides={true} src={this.state.src}
                                 ref={cropper => this.cropper = cropper}/>
                    </Col>

                    <Col s={12}>
                        {renderButtonsOrLoader}
                    </Col>
                </Row>
            </div>
        );
    }
}