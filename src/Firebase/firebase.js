import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/*<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAKqfixgXg0ZXbTpbgvI2GXdcLWXhFjrs4",
    authDomain: "ohkeprojekti.firebaseapp.com",
    databaseURL: "https://ohkeprojekti.firebaseio.com",
    projectId: "ohkeprojekti",
    storageBucket: "ohkeprojekti.appspot.com",
    messagingSenderId: "488547897316",
    appId: "1:488547897316:web:b34700cfbb46efe5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>*/

/*const config = {
  apiKey: AIzaSyAKqfixgXg0ZXbTpbgvI2GXdcLWXhFjrs4,
  authDomain: ohkeprojekti.firebaseapp.com,
  databaseURL: 'https://ohkeprojekti.firebaseio.com',
  projectId: ohkeprojekti,
  storageBucket: ohkeprojekti.appspot.com,
  messagingSenderId: 488547897316,
}; */
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

      user = uid => this.db.ref(`users/${uid}`);

      users = () => this.db.ref('users');

}

export default Firebase;
