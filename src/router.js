import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// Layouts
import MainLayout from './components/layouts/main-layout';
import Dashboard from './components/layouts/dashboard';

// Pages
import Home from './components/containers/home/home';
import About from './components/containers/about/about';
import Contact from './components/containers/contact/contact';
import Signup from './components/containers/auth/signup/signup';
import Signin from './components/containers/auth/signin/signin';
import ForgotPassword from './components/containers/auth/forgot-password/forgot-password';
import Terms from './components/containers/auth/terms/terms';

// SubPages
import Offers from './components/containers/offers/offers';
import Stores from './components/containers/stores/stores';
import UserProfile from './components/containers/user-profile/user-profile';

export default(
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Home}/>

      <Route path="/about" component={About}/>

      <Route path="/contact" component={Contact}/>

      <Route path="/signup" component={Signup}/>

      <Route path="/signin" component={Signin}/>

      <Route path="/forgot-password" component={ForgotPassword}/>

      <Route path="/terms" component={Terms}/>

      <Route path="dashboard">
        <Route component={Dashboard}>
          <IndexRoute component={Offers}/>
        </Route>
        <Route path="stores" component={Stores}/>
        <Route path="user" component={UserProfile}/>
      </Route>

    </Route>
  </Router>
);