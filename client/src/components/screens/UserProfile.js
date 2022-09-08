import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Loader from '../Loader';

const UserProfile = () => {
  const { userId } = useParams()
  const [profile, setProfile] = useState(null)
  const { state, dispatch } = useContext(UserContext)
  const [showFollow, setShowFollow] = useState(state ? !state.followers.includes(userId) : true)

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: 'secret ' + localStorage.getItem('jwt'),
      }
    }).then(res => res.json())
      .then(result => {
        setProfile(result)
      })
      // eslint-disable-next-line
  }, [setProfile])

  const followUser = () => {
    fetch(`/follow`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'secret ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userId
      })
    }).then(res => res.json())
      .then(data => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        })
        localStorage.setItem('user', JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id]
            },
          }
        })
        setShowFollow(false)
      })
  }

  const unfollowUser = () => {
    fetch(`/unfollow`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'secret ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        unfollowId: userId
      })
    }).then(res => res.json())
      .then(data => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        })
        localStorage.setItem('user', JSON.stringify(data));
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(s => s !== data._id)
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower
            },
          }
        })
        setShowFollow(true)
      })
  }


  return (
    <>
      {profile
        ? <div className="profile">
          <div className="profile__main">
            <div className="profile__main_img">
              <img
                className="profile__img"
                src="https://images.unsplash.com/photo-1626307416562-ee839676f5fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjk3fHxwZXJzb258ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="profile"
              />
            </div>
            <div>
              <h4 className='user__name'>{profile ? profile.user.name : "Loading name..."}</h4>
              <p className='user__email'>{profile ? profile.user.email : 'Loading email...'}</p>
              <div className="profile__content_info">
                <div className="infoprofile">
                  <div className='infoprofile__cont'>
                    <p>{profile.posts.length}</p>
                    <span>posts</span>
                  </div>
                  <div className='infoprofile__cont'>
                    <p>{profile.user.followers.length}</p>
                    <span>followers</span>
                  </div>
                  <div className='infoprofile__cont'>
                    <p>{profile.user.following.length}</p>
                    <span>following</span>
                  </div>
                </div>
                <div className='follow__btn_content'>
                  {showFollow
                    ? (state.following.includes(userId) 
                        ? <button className='btn btn__unfollow' onClick={() => unfollowUser()}>Un Follow</button> 
                        : <button className='btn btn__follow' onClick={() => followUser()}>Follow</button>
                      )
                    : <button className='btn btn__unfollow' onClick={() => unfollowUser()}>Un Follow</button>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="gallery container">
            {profile.posts.map(item => {
              return (
                <div className="grid__item" key={item._id}>
                  <div className="grid__item_inner">
                    <img
                      src={item.photo}
                      className="grid__item_img"
                      alt={item._id}
                    />
                    <div className="grid__item_icon">
                      <span className="icon__img">
                        <i className="material-icons">favorite_border</i>{item.likes.length}
                      </span>
                      <span className="icon__img">
                        <i className="material-icons">mode_comment</i> {item.comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        : <Loader />
      }
    </>
  );
};

export default UserProfile;
