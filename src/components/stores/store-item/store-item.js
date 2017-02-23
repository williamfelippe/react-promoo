import React, {Component} from "react";
import {CardPanel} from "react-materialize";
import {Link} from "react-router";
import ImageWrapper from "../../util/image-wrapper/image-wrapper";
import * as storeService from "../../../services/store-service";
import "./store-item.css";

export default class StoreItem extends Component {
    reportStoreDoesNotExist() {
        storeService.postStoreReport({})
            .then((response) => {

            })
            .catch((error) => {

            });
    }

    render() {
        const {store} = this.props;

        const formatedAddress =
            `${store.address.street} - ${store.address.neighborhood}. ${store.address.city}`

        return (
            <CardPanel className="moo-store-card">
                <Link to={`dashboard/store/${store._id}`}>
                    <div className="right-align category">
                        {
                            /* Categoria */
                            store.category.name
                        }
                    </div>

                    <div className="image">
                        {
                            store.logo &&
                            <ImageWrapper src={store.logo} alt={store.name} className="circle"/>
                        }
                    </div>

                    <div className="name center-align truncate">
                        {
                            /* Nome*/
                            store.name
                        }
                    </div>

                    <div className="address center-align">
                        {
                            /* Endereço */
                            formatedAddress
                        }
                    </div>
                </Link>

                <div className="actions center-align">
                    <a onClick={this.reportStoreDoesNotExist.bind(this)}>
                        Essa loja não existe ou mudou de lugar? Avise-nos
                    </a>
                </div>
            </CardPanel>
        );
    }
}