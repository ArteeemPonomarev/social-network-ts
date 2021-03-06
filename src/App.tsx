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
  addPost: (postText: string) => void
}

const App = (props: AppPropsType) => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="wrapper">
          <Navbar />
          <div className="wrapperContent">
            <Route path='/dialogs' render={() => <Dialogs dialogs={props.state.dialogsPage.dialogs}
                                                          messages={props.state.dialogsPage.messages}
                                                          addPost={props.addPost}/>} />
            <Route path='/profile' render={() => <Profile posts={props.state.profilePage.posts} addPost={props.addPost}/>} />
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
