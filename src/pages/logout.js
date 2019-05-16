import React from 'react';

import { withFirebase } from '../Firebase';
// luodaan nappi jonka avulla sovelluksesta voi kirjautua ulos
const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Kirjaudu ulos
  </button>
);

export default withFirebase(SignOutButton);
