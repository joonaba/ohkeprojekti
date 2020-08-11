import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
//import SignOutButton from '../SignOut';
import * as ROUTES from '../routing/router.js';
import SignOutButton from '../pages/logout.js';
import { AuthUserContext } from '../Session';

// määritellään kumpi navigaatio näkyy riippuen onko käyttäjä autentikoitu vai ei
const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);
// navigaatio kun käyttäjä on autentikoitu
const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Chatti</Link>
    </li>

    <li>
      <SignOutButton />
    </li>
  </ul>
);
// navigaatio kun käyttäjää ei ole autentikoitu
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_UP}>Tee käyttäjä</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Kirjaudu sisään</Link>
    </li>

  </ul>
);

export default Navigation;
