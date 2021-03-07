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
import {RootStateType} from './redux/state';


type AppPropsType = {
  state: RootStateType
  addPost: () => void
  addDialogMessage: () => void
  onNewDialogMessageChange: (newText: string) => void
  onChangePostValue: (newText: string) => void
}

const App = (props: AppPropsType) => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="wrapper">
          <Navbar />
          <div className="wrapperContent">
            <Route path='/dialogs' render={() => <Dialogs dialogsPage={props.state.dialogsPage} addDialogMessage={props.addDialogMessage} onNewDialogMessageChange={props.onNewDialogMessageChange}/>} />
            <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage} addPost={props.addPost} onChangePostValue={props.onChangePostValue} />} />
            <Route path='/music' render={() => <Music/>} />
            <Route path='/news' render={() => <News/>} />
            <Route path='/settings' render={() => <Settings/>} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;
