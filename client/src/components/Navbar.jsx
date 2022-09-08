import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';



const Navbar = () => {
  const { state } = useContext(UserContext)
  const [count, setCount] = useState(0)

  useEffect(() => {

    // eslint-disable-next-line
  },[count])

  const RenderNav = () => {
    if(state) {
      return (
        <>
          <li><Link to="/"> <i className="material-icons navbar__homeIcon signIn__icon">home</i></Link></li>
          <li><Link to="/allposts"> <i className="material-icons navbar__homeIcon signIn__icon">loupe</i></Link></li>
          <li><Link to="/createpost"> <i className="material-icons navbar__homeIcon signIn__icon">add_box</i></Link></li>
          <li><Link to="/profile"><i className="material-icons navbar__homeIcon signIn__icon">person</i></Link></li>
        </>
      )
    } else {
      if(window.location.href === "http://localhost:3000/signin") {
        return (
          <>
            <li><Link to="/signup" onClick={(prev) => setCount(prev + 1)}>Sign Up</Link></li>
          </>
        )
      } else{
        return (
          <>
            <li><Link to="/signin" onClick={(prev) => setCount(prev - 1)}>Sign In</Link></li>
          </>
        )
      }
    }
  }

  return (
    <nav className='white'>
      <div className="nav-wrapper container navBg">
        <Link to={state ? '/' : '/signup'} className="brand-logo">Netgram</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <RenderNav />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;