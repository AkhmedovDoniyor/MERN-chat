import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import HomeSideBar from './HomeSideBar';
import { UserContext } from '../../App';

const SubscrUserPost = () => {
  const [data, setData] = useState([]);
  const [userComm, setUserComm] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const { state } = useContext(UserContext);

  useEffect(() => {
    fetch('/getsubspost', {
      headers: {
        Authorization: 'secret ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      });
  }, [setData]);

  const likePost = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'secret ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const unLikePost = (id) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'secret ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const openModal = (id) => {
    setUserComm(id);
    setModalActive(true);
  };

  const commentPost = (text, postId) => {
    fetch('/comments', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'secret ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    if (prompt('Are you sure you want to delete this post?', 'ok') === 'ok') {
      fetch(`/deletepost/${postId}`, {
        method: 'delete',
        headers: {
          Authorization: 'secret ' + localStorage.getItem('jwt'),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          const newData = data.filter((d) => d._id !== result);
          setData(newData);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {data.length ? (
        <div className="home container">
          <div className="home__item">
            <h3 className="home__post">My Following Users Posts</h3>
            {data
              .map((item) => {
                return (
                  <div className="card home__card" key={item._id}>
                    <div className="delete__post">
                      <Link
                        to={
                          item.postedBy._id !== state._id
                            ? `/profile/` + item.postedBy._id
                            : '/profile'
                        }
                        className={{ cursor: 'pointer' }}>
                        {item.postedBy.email}
                      </Link>
                      <a href="#delete">
                        {item.postedBy._id === state._id ? (
                          <i onClick={() => deletePost(item._id)} className="material-icons">
                            delete_forever
                          </i>
                        ) : (
                          ''
                        )}
                      </a>
                    </div>
                    <h5 className="home__card_name">{item.postedBy.name}</h5>
                    <div className="card__img">
                      <img src={item.photo} alt="" />
                    </div>
                    <div className="card__content">
                      <div className="card__content_icons">
                        <div className="card__content_likes">
                          {item.likes.includes(state._id) ? (
                            <i
                              className="material-icons like__icon"
                              style={{ color: 'red' }}
                              onClick={() => unLikePost(item._id)}>
                              favorite
                            </i>
                          ) : (
                            <i
                              className="material-icons like__icon"
                              style={{ color: 'rgb(219, 213, 213)' }}
                              onClick={() => likePost(item._id)}>
                              favorite
                            </i>
                          )}
                          {item.likes.length > 0 ? <span>{item.likes.length}</span> : ''}
                        </div>
                        <button className="btn__comment_home" onClick={() => openModal(item._id)}>
                          <i
                            className="material-icons prefix signIn__icon"
                            style={{ cursor: 'pointer' }}>
                            mode_comment
                          </i>
                        </button>
                      </div>
                      <h4 className="card__content_title">{item.title}</h4>
                      <p className="card__content_desc">{item.body}</p>
                      <p className="comment__count_desc">
                        Comment: <span className="comment__count_span">{item.comments.length}</span>
                      </p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          commentPost(e.target[0].value, item._id);
                        }}>
                        <div className="input-field col s6 comment_content_form">
                          <i className="material-icons prefix signIn__icon">mode_comment</i>
                          <input type="text" className="validate input__auth" />
                          <label className="signIn__label">Add to commit</label>
                          <button className="comment__send" type="submit">
                            {' '}
                            <i className="material-icons">send</i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                );
              })
              .reverse()}
          </div>
          <div className="homeSidebar">
            <HomeSideBar />
          </div>
        </div>
      ) : (
        <div className='oppovesh__user'>
          <p>Please enter the second icon "<span><i className="material-icons navbar__homeIcon oppo">loupe</i></span>" in the navigation panel and follow users to follow them</p>
          <p>Пожалуйста войдите во вторую иконку "<span><i className="material-icons navbar__homeIcon oppo">loupe</i></span>" в навигационной панели и подпишитесь пользователям что-бы наблюдать за ними </p>
        </div>
      )}
      <Modal active={modalActive} setActive={setModalActive} userComm={userComm} />
    </>
  );
};

export default SubscrUserPost;
