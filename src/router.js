import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// Layouts
import MainLayout from './layouts/main-layout';
import DashboardLayout from './layouts/dashboard-layout';
import UserLayout from './layouts/user-layout';

// Pages
import Home from './containers/home/home';
import About from './containers/about/about';
import Contact from './containers/contact/contact';
import Signup from './containers/auth/signup/signup';
import Signin from './containers/auth/signin/signin';
import ForgotPassword from './containers/auth/forgot-password/forgot-password';
import Terms from './containers/auth/terms/terms';

// SubPages
import Offers from './containers/offers/offers';
import Stores from './containers/stores/stores';
import UserProfile from './containers/user/user-profile/user-profile';
import EditAvatar from './containers/user/edit-avatar/edit-avatar';
import EditEmail from './containers/user/edit-email/edit-email';
import EditPassword from './containers/user/edit-password/edit-password';

export default(
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="/" component={Home}/>

            <Route path="about" component={About}/>

            <Route path="contact" component={Contact}/>

            <Route path="signup" component={Signup}/>

            <Route path="signin" component={Signin}/>

            <Route path="forgot-password" component={ForgotPassword}/>

            <Route path="terms" component={Terms}/>

            <Route path="dashboard">
                <Route component={DashboardLayout}>
                    <IndexRoute component={Offers}/>
                </Route>
                <Route path="stores" component={Stores}/>
                <Route path="user">
                    <Route component={UserLayout}>
                        <IndexRoute component={UserProfile}/>
                    </Route>
                    <Route path="edit-avatar" component={EditAvatar}/>
                    <Route path="edit-email" component={EditEmail}/>
                    <Route path="edit-password" component={EditPassword}/>
                </Route>
            </Route>
        </Route>
    </Router>
);