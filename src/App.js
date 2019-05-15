import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './navigation';
//import LandingPage from '../Landing';
import SignUpPage from './pages/login.js';
//import SignInPage from '../SignIn';
//import PasswordForgetPage from '../PasswordForget';
//import HomePage from '../Home';
//import AccountPage from '../Account';
//import AdminPage from '../Admin';

import * as ROUTES from './routing/router.js';
//import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />


      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />


    </div>
  </Router>
);

export default App;
