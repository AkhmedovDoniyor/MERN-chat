import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (url) {
      fetch('/createpost', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'secret ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          title,
          body,
          photo: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: 'rounded #d50000 red accent-4' });
          } else {
            M.toast({ html: 'Completed successfully', classes: 'rounded #2e7d32 green darken-3' });
            history.push('/');
          }
        });
    }
    //eslint-disable-next-line
  }, [url]);

  const postDetails = () => {
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

  return (
    <div className="card input-field postCard">
      <h2>Post</h2>
      <div className="post__title">
        <i className="material-icons ">subtitles</i>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="post__input"
        />
      </div>
      <div className="post__description">
        <i className="material-icons ">content_paste</i>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Description"
          className="post__input"
        />
      </div>
      <div className="file-field input-field">
        <div className="btn #651fff deep-purple accent-3 post__addIcon">
          <i className="material-icons">add</i>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input placeholder="Image" className="file-path validate post__input" type="text" />
        </div>
      </div>
      <button
        onClick={() => postDetails()}
        className="btn waves-effect waves-light #651fff deep-purple accent-3"
        type="submit"
        name="action">
        Create
        <i className="material-icons right">send</i>
      </button>
    </div>
  );
};

export default CreatePost;
