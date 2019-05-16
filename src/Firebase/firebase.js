import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// configuroidaan api keyt sun muut millä linktetään sovellus ja tietokanta yhteen
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
// tehdään luokka firebaselle missä määritellään toiminnot mitä sovelluksessa käytetään
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.serverValue = app.database.ServerValue;
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();



      user = uid => this.db.ref(`users/${uid}`);

      users = () => this.db.ref('users');

// ohjelma api
      program = uid => this.db.ref(`programs/${uid}`);

      programs = () => this.db.ref('programs');

}

export default Firebase;
