import React, { useContext, useEffect, useState, useRef } from 'react';
import {  useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';

const EditProfilePage = () => {
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState('');
  const [myName, setMyName] = useState('');
  const [myEmail, setMyEmail] = useState('');
  const history = useHistory();
  const inputName = useRef()
  const inputEmail = useRef()

  useEffect(() => {
    if (image) {
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
          fetch('/updatepic', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'secret ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem('user', JSON.stringify({ ...state, pic: result.pic }));
              dispatch({ type: 'UPDATEPIC', payload: result.pic });
            });
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line 
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  const editName = () => {
    if (myName) {
      fetch('/editname', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'secret ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          myName
        }),
      }).then(res => res.json())
        .then(data => {
          localStorage.setItem('user', JSON.stringify({ ...state, name: data.name }));
          dispatch({ type: 'EDITNAME', payload: data.name });
          M.toast({ html: 'Your Name was changed successfully', classes: 'rounded #2e7d32 green darken-3' });
        })
    }
    inputName.current.value = ''
  };

  const editEmail = () => {
    if (myEmail) {
      fetch('/editemail', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'secret ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          myEmail
        }),
      }).then(res => res.json())
        .then(result => {
          localStorage.setItem('user', JSON.stringify({ ...state, email: result.email }));
          dispatch({ type: 'EDITEMAIL', payload: result.email });
          M.toast({ html: 'Your Email was changed successfully', classes: 'rounded #2e7d32 green darken-3' });
        })
    }
    inputEmail.current.value = ''
  };

  return (
    <>
      {state ? (
        <div className="container edit_content">
          <div className="row">
            <div className=" edit">
              <div className="card edit_content">
                <form className="form__editPost">
                  <div className="file-field input-field">
                    <div className="btn btn__file_edit">
                      <span>
                        <i className="material-icons">add_a_photo</i>
                      </span>
                      <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                      <label htmlFor="input_text">Edit Profile Image</label>
                      <input
                        className="file-path validate"
                        type="text"
                        onChange={(e) => updatePhoto(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <button className="btn btn_edit" type="submit">
                    Edit Photo
                  </button>
                </form>
                <div className="row nameOrEmail">
                  <div className="input-field col s6">
                    <input ref={inputName} type="text" onChange={(e) => setMyName(e.target.value)} />
                    <label htmlFor="input_text">Edit Name</label>
                    <button onClick={() => editName()} className="btn btn_edit_profile">
                      Edit Name
                    </button>
                  </div>
                  <div className="input-field col s6">
                    <input ref={inputEmail} type="text" onChange={(e) => setMyEmail(e.target.value)} />
                    <label htmlFor="input_text">Edit Email</label>
                    <button onClick={() => editEmail()} className="btn btn_edit_profile">
                      Edit Email
                    </button>
                  </div>
                </div>
                <button onClick={() => {history.push('/profile')}} className="btn btn_edit_profile">
                  Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default EditProfilePage;
