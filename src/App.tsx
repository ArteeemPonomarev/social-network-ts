import React, {Suspense, useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import store, {AppStateType} from './redux/redux-store';
import Preloader from './components/common/Pleloader/Preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

const App = () => {

    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (!initialized) {
        return <Preloader/>
    }
    return (
        <div>
            <HeaderContainer/>
            <div className="wrapper">
                <Navbar/>
                <div className="wrapperContent">
                    <Suspense fallback={<Preloader/>}>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export const SocialNetworkApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    )
}


