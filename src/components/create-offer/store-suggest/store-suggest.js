import React, {Component} from "react";
import {Row, Col, Input, Modal} from "react-materialize";
import CreateStoreForm from '../../stores/create-store-form/create-store-form';

export default class StoreSuggest extends Component {
    render() {
        const {stores, onChangeStore} = this.props;

        const listStores = stores.map((store) =>
            <option value={store._id} key={store._id}>
                {store.name}
            </option>
        );

        const defaultValue = (stores.length > 0) ? stores[0] : "";

        return (
            <Row>
                <Input s={12} type="select" label="Escolha a loja" defaultValue={defaultValue} onChange={onChangeStore.bind(this)}>
                    {listStores}
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