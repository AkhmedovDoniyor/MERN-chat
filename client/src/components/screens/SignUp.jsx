import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const SignUp = () => {
  const history = useHistory();
  const [regName, setRegName] = useState('');
  const [regPassword, serRegPassword] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  const uploadPicture = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'NetGram');
    data.append('cloud_name', 'dkjkqolhn');
    fetch('https://api.cloudinary.com/v1_1/dkjkqolhn/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));

  };

  const ourFields = () => {
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
    fetch('http://localhost:5000/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: regName,
        email: regEmail,
        password: regPassword,
        pic: url
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: 'rounded #d50000 red accent-4' });
        } else {
          M.toast({ html: data.message, classes: 'rounded #2e7d32 green darken-3' });
          history.push('/signin');
        }
      });
  }

  const postData = () => {
    if(image) {
      uploadPicture()
    } else {
      ourFields()
    }
  };

  useEffect(() => {
    if(url) {
      ourFields()
    }
  }, [url])

  return (
    <div className="mycard">
      <div className="card card__auth">
        <h3>Netgram</h3>
        <div className="signup__image ">
          <img
            src={url ? url : "https://res.cloudinary.com/dkjkqolhn/image/upload/v1661845188/avatar_qru48h.png"}
            alt="Avatar"
            className="image"
          />
          <div className="file-field input-field">
            <div className="btn__addphoto">
              <button className='btn' onChange={(e) => setImage(e.target.files[0])}>
                <i className="material-icons prefix signIn__icon add_img">add_a_photo</i>
                <input type="file" />
                <input className="file-path validate" type="text" />
              </button>
            </div>
          </div>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix signIn__icon">person</i>
          <input
            id="icon_prefix"
            type="text"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            className="validate input__auth"
          />
          <label htmlFor="icon_prefix" className="signIn__label">
            Enter name
          </label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix signIn__icon">email</i>
          <input
            id="icon_prefix"
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
            id="icon_prefix"
            value={regPassword}
            onChange={(e) => serRegPassword(e.target.value)}
            type="password"
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
          Sign Up
          <i className="material-icons right">send</i>
        </button>
        <p className="auth__desc">
          Have an account?{' '}
          <Link to="/signin" className="btn__singup">
            Sung In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
