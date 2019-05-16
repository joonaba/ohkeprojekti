import React from 'react';
// laitetaan session componenttihierarkiassa ylös jotta muut komponentit voivat käyttää sitä
const AuthUserContext = React.createContext(null);

export default AuthUserContext;
