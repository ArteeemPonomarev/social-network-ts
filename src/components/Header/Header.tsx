import React from 'react';
import style from './Header.module.css';
import {Link} from 'react-router-dom';
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";


export const Header: React.FC = () => {

    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth);
    const login = useSelector<AppStateType, string | null>(state => state.auth.login);

    const dispatch = useDispatch();

    const logoutCallback = () => {
        dispatch(logout())
    }

    const {Header} = Layout;

    return <Header className="header">
        <div className="logo"/>
        <Row>
            <Col span={18}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">
                        <Link className={style.item} to="/users">Developers</Link>
                    </Menu.Item>
                </Menu>
            </Col>

            {isAuth
                ? <>
                    <Col span={1}>
                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                    </Col>
                    <Col span={5}>
                        {login} - <Button onClick={logoutCallback}>Log out</Button>
                    </Col>
                </>
                : <Col span={6}>
                    <Button>
                        <Link to={'/login'}>Login</Link>
                    </Button>
                </Col>
            }


        </Row>

    </Header>

};


//return (
//     <header className={style.header}>
//         <img src={logo} alt="logo"/>
//         <div className={style.loginBlock}>
//             {props.isAuth
//                 ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
//                 : <NavLink to={'/login'}>Login</NavLink>
//             }
//         </div>
//     </header>
// )

export default Header;