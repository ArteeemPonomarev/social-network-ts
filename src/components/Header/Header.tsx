import React from 'react';
import style from './Header.module.css';
import logo from '../../logos/header_logo.png';
import {NavLink} from 'react-router-dom';

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <header className={style.header}>
            <img src={logo} alt="logo"/>
            <div className={style.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
};

export default Header;