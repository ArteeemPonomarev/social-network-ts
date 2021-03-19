import React from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import {ActionsTypes} from './redux/redux-store';
import {AppStateType} from './redux/redux-store';


type AppPropsType = {
  state: AppStateType
  dispatch: (action: ActionsTypes) => void
};

const App = (props: AppPropsType) => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="wrapper">
          <Navbar />
          <div className="wrapperContent">
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage} dispatch={props.dispatch} />} />
            <Route path='/music' render={() => <Music/>} />
            <Route path='/news' render={() => <News/>} />
            <Route path='/settings' render={() => <Settings/>} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};


export default App;
