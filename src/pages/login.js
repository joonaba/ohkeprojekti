import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import'./Login.css';
import { SignUpLink } from './signup';
//import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../routing/router.js';

const SignInPage = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>
  <div className="body1"  >
    <h1>Kirjaudu sisään</h1>
    <SignInForm />
    <SignUpLink />
  </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
// lähetetääm lomakkeen tiedot tietokantaan eli tässä tapauksessa tarkistetaan että käyttäjä on olemassa
  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };
// teksikentän muokkaaminen
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Sähköpostiosoite"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Salasana"
        />
        <button disabled={isInvalid} type="submit">
          Kirjaudu sisään
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
// tehdään formista yksi constantti joka pitää sisällään tarvittavat asiat routerin ja firebasen toimimiseen 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
