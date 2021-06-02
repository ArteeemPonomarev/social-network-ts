import React, {useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {useDispatch, useSelector} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import {AppStateType} from './redux/redux-store';
import Preloader from './components/common/Pleloader/Preloader';


const App = () => {

    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized )

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeApp())
    },[dispatch])

    if (!initialized) {
        return <Preloader/>
    }
    return (
        <BrowserRouter>
            <div>
                <HeaderContainer/>
                <div className="wrapper">
                    <Navbar/>
                    <div className="wrapperContent">
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>

                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};


export default App;
