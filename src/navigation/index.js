import React from 'react';
import { Link } from 'react-router-dom';

//import SignOutButton from '../SignOut';
import * as ROUTES from '../routing/router.js';



const Navigation = () => (
  <div>

        <NavigationNonAuth />


  </div>
);


const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_UP}>Sign up</Link>
    </li>
  </ul>
);

export default Navigation;
