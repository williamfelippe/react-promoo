import React, {Component} from "react";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

// Layouts
import MainLayout from './layouts/main-layout';
import DashboardLayout from './layouts/dashboard-layout';
import UserLayout from './layouts/user-layout';

// Pages
import NoMatch from './containers/no-match/no-match';
import Home from './containers/home/home';
import About from './containers/about/about';
import Contact from './containers/contact/contact';
import Signup from './containers/auth/signup/signup';
import Signin from './containers/auth/signin/signin';
import ForgotPassword from './containers/auth/forgot-password/forgot-password';
import Terms from './containers/terms/terms';

// SubPages
import Offers from './containers/offers/offers';
import OfferDetail from './containers/offer-detail/offer-detail';
import Stores from './containers/stores/stores';
import StoreDetail from './containers/store-detail/store-detail';
import CreateOffer from './containers/create-offer/create-offer';
import CreateStore from './containers/create-store/create-store';
import UserProfile from './containers/user/user-profile/user-profile';
import EditAvatar from './containers/user/edit-avatar/edit-avatar';
import EditEmail from './containers/user/edit-email/edit-email';
import EditPassword from './containers/user/edit-password/edit-password';

import {isLoggedIn} from './utils/user-information-store';

export default class App extends Component {
    requireAuth(nextState, replace) {
        if(!isLoggedIn()) {
            replace('/entrar');
        }
    }

    render() {
        return (
            <Router history={browserHistory}>
                <Route component={MainLayout}>
                    <Route path="/" component={Home}/>
                    <Route path="sobre" component={About}/>
                    <Route path="contato" component={Contact}/>
                    <Route path="registrar" component={Signup}/>
                    <Route path="entrar" component={Signin}/>
                    <Route path="esqueci-a-senha" component={ForgotPassword}/>
                    <Route path="termos-de-uso" component={Terms}/>
                    <Route path="detalhes-usuario/:userId" component={UserProfile}/>

                    <Route path="dashboard">
                        <Route component={DashboardLayout}>

                            <IndexRoute component={Offers}/>

                            <Route path="ofertas" component={Offers}/>
                            <Route path="oferta/:offerId" component={OfferDetail}/>
                            <Route path="lojas" component={Stores}/>
                            <Route path="loja/:storeId" component={StoreDetail}/>
                            <Route path="criar-oferta" component={CreateOffer} onEnter={this.requireAuth} />
                            <Route path="criar-loja" component={CreateStore} onEnter={this.requireAuth} />

                            <Route path="usuario">
                                <Route component={UserLayout}>
                                    <IndexRoute component={UserProfile} />

                                    <Route path="perfil-usuario" component={UserProfile} onEnter={this.requireAuth} />
                                    <Route path="editar-avatar" component={EditAvatar} onEnter={this.requireAuth} />
                                    <Route path="editar-email" component={EditEmail} onEnter={this.requireAuth} />
                                    <Route path="editar-senha" component={EditPassword} onEnter={this.requireAuth} />
                                </Route>
                            </Route>
                        </Route>
                    </Route>

                    <Route path="*" component={NoMatch}/>
                </Route>
            </Router>
        )
    }
}