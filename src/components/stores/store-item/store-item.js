import React, {Component} from "react";
import {Col, CardPanel} from "react-materialize";
import ImageLoader from "../../util/image-loader/image-loader";
import "./store-item.css";

export default class StoreItem extends Component {
    render() {
        const {store} = this.props;

        return (
            <Col s={this.props.s} m={this.props.m} l={this.props.l}>
                <CardPanel className="moo-store-card">
                    <div className="right-align category">
                        {/* Categoria */}
                        {store.category.name}
                    </div>

                    <div className="image">
                        {store.photo && <ImageLoader src={store.logo} alt={store.name} className="circle" />}
                    </div>

                    <div className="name center-align truncate">
                        {/* Nome */}
                        {store.name}
                    </div>

                    <div className="actions center-align">
                        <a>
                            Essa loja não existe ou mudou de lugar? Avise-nos
                        </a>
                    </div>
                </CardPanel>
            </Col>
        );
    }
}