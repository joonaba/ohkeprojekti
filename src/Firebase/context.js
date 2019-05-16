import React from 'react';
// firebase laitetaan komponenttien hierarkiassa ylös jotta muut komponentit voivat käyttää sitä tarvitessaan
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
