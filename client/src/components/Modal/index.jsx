import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './modal.css'

const Modal = ({active, setActive, userComm}) => {
  const { state } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/allpost', {
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



  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setActive(false)} className='popup__btn_close'><i className="material-icons">close</i></button>
        {/* eslint-disable-next-line */}
        {data.map(item => {
          if(item._id === userComm) {
            return (
              <div className="modal__content_active" key={item._id}>
                <div className="modal__content_img">
                  <img src={item.photo} alt="" />
                </div>
                <div className="modal__content_base">
                  <button className="modal__content_base-btn">{item ? `${item.postedBy.name}` : ''}</button>
                    {item.comments.map((comment) => {
                        return (
                          <div key={comment._id} style={{width: 'max-content'}}>
                            <div className="modal__comment_block">
                              <button>
                                {
                                  <Link to={state._id === comment.postedBy ? '/profile' : "/profile/" + comment.postedBy}>User</Link>
                                }
                              </button>
                              <p className="modal__content_comment">{comment.text}</p>
                            </div>
                          </div>
                        )
                      })}
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};

export default Modal;

