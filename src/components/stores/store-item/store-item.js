import React, {Component} from "react";
import {CardPanel} from "react-materialize";
import {Link, browserHistory} from "react-router";
import {postStoreReport} from "../../../services/store-service";
import {clearUserStore, getLoggedUserId, isLoggedIn} from "../../../utils/user-information-store";
import {expiredSessionError, opsInternalError} from "../../../utils/strings";
import {REQUEST_SUCCESS, UNAUTHORIZED} from "../../../utils/constants";
import {publishMessage} from "../../../utils/messages-publisher";
import ImageWrapper from "../../util/image-wrapper/image-wrapper";
import "./store-item.css";

export default class StoreItem extends Component {
    reportStoreDoesNotExist() {
        if (!isLoggedIn()) {
            browserHistory.push('entrar');
        }
        else {
            postStoreReport({store_id: this.props.store._id, report_by: getLoggedUserId()})
                .then((response) => {
                    const status = response.status;

                    if (status === REQUEST_SUCCESS) {
                        console.log(response);
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
                        this.setState({loadingSubmit: false});
                    }
                });
        }
    }

    render() {
        const {store} = this.props;

        const formatedAddress =
            `${store.address.street} - ${store.address.neighborhood}. ${store.address.city}`;

        return (
            <CardPanel className="moo-store-card">
                <Link to={`dashboard/loja/${store._id}`}>
                    <div className="right-align category">
                        {
                            /* Categoria */
                            store.category.name
                        }
                    </div>

                    <div className="image">
                        {
                            (store.logo) && <ImageWrapper src={store.logo} alt={store.name} className="circle"/>
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