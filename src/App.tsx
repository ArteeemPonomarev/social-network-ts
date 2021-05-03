import React from 'react';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

const App = () => {
  console.log('App render')
  return (
    <BrowserRouter>
      <div>

        <HeaderContainer />
        <div className="wrapper">
          <Navbar />
          <div className="wrapperContent">
            <Route path='/login' render={() => <Login/>} />
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/music' render={() => <Music/>} />
            <Route path='/news' render={() => <News/>} />
            <Route path='/settings' render={() => <Settings/>} />
            <Route path='/users' render={() => <UsersContainer/>}/>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};


export default App;
