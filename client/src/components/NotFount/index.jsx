import React from 'react';
import { Link } from 'react-router-dom';
import './NotFount.css'

const NotFount = () => {
  return (
    <section className="page_404">
      <div className="notfount__post">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">No Photo</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <Link to={'/createpost'} className="link_404">
                  Create post
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFount;
