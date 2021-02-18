import React from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="wrapper">
          <Navbar />
          <div className="wrapperContent">
            <Route path='/dialogs' component={Dialogs} />
            <Route path='/profile' component={Profile} />
            <Route path='/music' component={Music} />
            <Route path='/news' component={News} />
            <Route path='/settings' component={Settings} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;
