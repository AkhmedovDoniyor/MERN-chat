import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from '../../App';

const SignIn = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [regPassword, serRegPassword] = useState('');
  const [regEmail, setRegEmail] = useState('');

  const postData = () => {
    // eslint-disable-next-line
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        regEmail,
      )
    ) {
      M.toast({
        html: 'Please enter your email address correctly',
        classes: 'rounded #d50000 red accent-4',
      });
      return;
    }
    fetch('/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'secret ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        email: regEmail,
        password: regPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: 'rounded #d50000 red accent-4' });
        } else {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch({ type: 'USER', payload: data.user });
          M.toast({ html: 'Login successful', classes: 'rounded #2e7d32 green darken-3' });
          history.push('/');
        }
      });
  };

  return (
    <div className="mycard">
      <div className="card card__auth">
        <h3>Netgram</h3>
        <div className="input-field col s6">
          <i className="material-icons prefix signIn__icon">email</i>
          <input
            type="email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            className="validate input__auth"
          />
          <label htmlFor="icon_prefix" className="signIn__label">
            Enter email
          </label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix signIn__icon">password</i>
          <input
            type="password"
            value={regPassword}
            onChange={(e) => serRegPassword(e.target.value)}
            className="validate input__auth"
          />
          <label htmlFor="icon_prefix" className="signIn__label">
            Enter password
          </label>
        </div>
        <button
          onClick={() => postData()}
          className="btn waves-effect waves-light #651fff deep-purple accent-3"
          type="submit">
          Sign In
          <i className="material-icons right">send</i>
        </button>
        <p className="auth__desc">
          Don't have an account yet?{' '}
          <Link to="/signup" className="btn__singup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
