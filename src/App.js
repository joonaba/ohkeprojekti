import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './navigation';
import SignUpPage from './pages/signup.js';
import SignInPage from './pages/login.js';
import HomePage from './pages/home.js';

import * as ROUTES from './routing/router.js';
import { withFirebase } from './Firebase';
import { withAuthentication } from './Session';
// määritellään mitä sovelluksessa renderoidaan
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
