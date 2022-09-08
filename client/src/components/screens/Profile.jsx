import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import NotFount from '../NotFount';
import PostIdPage from './PostIdPage';

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [post, setPost] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [userComm, setUserComm] = useState('');
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    fetch('/mypost', {
      headers: {
        Authorization: 'secret ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result.posts);
      });
  }, [setProfile]);

  const openPost = (postId) => {
    fetch(`/openpost/${postId}`, {
      method: 'get',
      headers: {
        Authorization: 'secret ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPost(result);
      })
      .catch((err) => console.log(err));
  };

  const openModal = (id) => {
    openPost(id);
    setUserComm(id);
    setModalActive(true);
  };


  return (
    <>
      <div className="profile">
        <div className="profile__main">
          <div className="profile__main_img">
            <img
              className="profile__img"
              src={
                state
                  ? state.pic
                  : 'https://res.cloudinary.com/dkjkqolhn/image/upload/v1661845188/avatar_qru48h.png'
              }
              alt="profile"
            />
          </div>
          <div>
            <h4 className="user__name">{state ? state.name : 'Loading name...'}</h4>
            <p className="user__email">{state ? state.email : 'Loading email...'}</p>
            <div className="profile__content_info">
              <div className="infoprofile">
                <div className="infoprofile__cont">
                  <p>{profile.length}</p>
                  <span>posts</span>
                </div>
                <div className="infoprofile__cont">
                  <p>{state ? state.followers.length : '0'}</p>
                  <span>followers</span>
                </div>
                <Link className="infoprofile__cont" to="/">
                  <p>{state ? state.following.length : '0'}</p>
                  <span>following</span>
                </Link>
              </div>
              <div className="profile__edit">
                <button
                  className="bnt__profile_logout"
                  style={{ color: 'red' }}
                  onClick={() => {
                    localStorage.clear();
                    dispatch({ type: 'CLEAR' });
                    history.push('/signin');
                  }}>
                  Log Out
                </button>
                <Link to={'/editpage'} style={{ color: '#5c20dd' }} className="bnt__profile_edit">
                  Profile Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="gallery container">
          {profile.length ? (
            profile.map((item) => {
              return (
                <div className="grid__item" key={item._id} onClick={() => openModal(item._id)}>
                  <div className="grid__item_inner">
                    <img src={item.photo} className="grid__item_img" alt={item._id} />
                    <div className="grid__item_icon">
                      <span className="icon__img">
                        <i className="material-icons">favorite_border</i>
                        {item.likes.length}
                      </span>
                      <span className="icon__img">
                        <i className="material-icons">mode_comment</i> {item.comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NotFount />
          )}
        </div>
      </div>
      <PostIdPage active={modalActive} setActive={setModalActive} userComm={userComm} />
      
    </>
  );
};

export default Profile;
