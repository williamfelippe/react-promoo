import React, {Component} from "react";
import {Row, Col, Input, Modal} from "react-materialize";
import CreateStoreForm from '../../stores/create-store-form/create-store-form';

export default class StoreSuggest extends Component {
    render() {
        return (
            <Row>
                <Input s={12} type="select" label="Escolha a loja" onChange={this.props.onChangeStore}>
                    {this.props.listStores}
                </Input>
                
                <Col s={12} className="right-align">
                    Não encontrou a loja?
                    <Modal header='Indicar loja' trigger={<a className="new-store">Cadastre-a aqui</a>} actions={null}>
                        <CreateStoreForm/>
                    </Modal>
                </Col>
            </Row>
        );
    }
}