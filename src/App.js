import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './navigation';
//import LandingPage from '../Landing';
import SignUpPage from './pages/signup.js';
import SignInPage from './pages/login.js';
//import PasswordForgetPage from '../PasswordForget';
import HomePage from './pages/home.js';
//import AccountPage from '../Account';
//import AdminPage from '../Admin';

import * as ROUTES from './routing/router.js';
import { withFirebase } from './Firebase';
//import { AuthUserContext } from './Session';
import { withAuthentication } from './Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />


      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />

      <Route path={ROUTES.HOME} component={HomePage} />

    </div>
  </Router>
);

export default withAuthentication(App);
