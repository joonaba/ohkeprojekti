import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../routing/router.js';
import './Signup.css'
import { withFirebase } from '../Firebase';
const SignUpPage = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>

  
  <div className="body2">
    <h1>Luo käyttäjä</h1>
    <SignUpForm />
  </div>

  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    //luodaan firebaseen uusi käyttäjä ja samalla autentikoidaan käyttäjä.

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email,username,  passwordOne)
      .then(authUser => {

        this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    //lomakkeen validonti määtitetään vaatimukset mitä salasanan sähköpostin ja käyttäjänimen pitää täyttää

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Käyttäjänimi"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Sähköposti"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Salasana"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Kirjoita salasana uudelleen"
        />
        <button disabled={isInvalid} type="submit">
          Luo käyttäjä
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export const SignUpLink = () => (
  <p>
    Eikö sinulla ole käyttäjää? <Link to={ROUTES.SIGN_UP}>Luo käyttäjä</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm };
