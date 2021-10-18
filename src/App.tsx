import React, {useEffect} from 'react';
import ProfileContainer from './components/Profile/ProfileContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {HashRouter, Link, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import store, {AppStateType} from './redux/redux-store';
import Preloader from './components/common/Pleloader/Preloader';
import {withSuspence} from "./hoc/withSuspence";
import 'antd/dist/antd.css'
import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import style from "./components/Navbar/Navbar.module.css";
import { Header } from './components/Header/Header';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

const App = () => {

    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)
    const dispatch = useDispatch();
    const catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        alert(promiseRejectionEvent)
    }

    useEffect(() => {
        dispatch(initializeApp());
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors);

        return () => {
            window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
        }
    }, [dispatch])

    if (!initialized) {
        return <Preloader/>
    }
    const {SubMenu} = Menu;
    const {Content, Footer, Sider} = Layout;

    return (
        <Layout>
            <Header/>
            <Content style={{padding: '0 50px', minHeight: '85vh'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
                                <Menu.Item key="1">
                                    <Link className={style.item} to="/profile">Profile</Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link className={style.item} to="/dialogs">Messages</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                <Menu.Item key="3">
                                    <Link className={style.item} to="/users">Developers</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <Switch>
                            <Route exact path='/' render={() => <Redirect to='/profile'/>}/>
                            <Route path='/login' render={() => <Login/>}/>
                            <Route path='/dialogs' render={withSuspence(DialogsContainer)}/>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/music' render={() => <Music/>}/>
                            <Route path='/news' render={() => <News/>}/>
                            <Route path='/settings' render={() => <Settings/>}/>
                            <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
};

export const SocialNetworkApp = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    )
}


