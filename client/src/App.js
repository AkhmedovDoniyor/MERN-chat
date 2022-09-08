import React, { useContext, useEffect } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import SignIn from "./components/screens/SignIn";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import SignUp from "./components/screens/SignUp";
import CreatePost from "./components/screens/CreatePost";
import {reducer, initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile';
import SubscrUserPost from './components/screens/SubscrUserPost';
import EditProfilePage from './components/screens/EditProfilePage';
import PostIdPage from './components/screens/PostIdPage';

//eslint-disable-next-line
export const UserContext = React.createContext()

const Routing = () => {
  const history = useHistory()
  const { dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user) {
      dispatch({type: "USER", payload: user})
      // history.push('/')
    } else {
      history.push('/signin')
    }
    // eslint-disable-next-line
  }, [])
  return (
    <Switch>
      <Route path="/allposts" exact component={Home } />
      <Route path="/signin" exact component={SignIn } />
      <Route path="/signup" exact component={SignUp } />
      <Route path="/profile" exact component={Profile } />
      <Route path="/createpost" exact component={CreatePost } />
      <Route path="/editpage" exact component={EditProfilePage } />
      <Route path="/profile/:userId" exact component={UserProfile } />
      <Route path="/openpost/:userId" exact component={PostIdPage } />
      <Route path="/" exact component={SubscrUserPost } />
    </Switch>
  )
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
    
  );
}

export default App;
