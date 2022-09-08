import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomeSideBar = () => {
  const [profile, setProfile] = useState([]);

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
  }, [profile]);

  return (
    <>
      {profile.length > 1 ? <h4>My Posts</h4> : <h4 className='home__mypost'>My Post</h4>}
      {profile.map((item) => {
        return (
          <div className="sidebar" key={item._id}>
            <div className="row">
              <div className="col s12 m12">
                <div className="card sidebar__card">
                  <div className="sidebar__card_img">
                    <img src={item.photo} alt={item._id} />
                  </div>
                  <Link to={"/profile/" + item.postedBy._id} className="sidebar__card_name">{item.postedBy.name}</Link>
                  <div className="sidebar__card_content">
                    <p className='sidebar__card_title'>{item.title}</p>
                    <p className='sidebar__card_desc'>{item.body}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default HomeSideBar;
