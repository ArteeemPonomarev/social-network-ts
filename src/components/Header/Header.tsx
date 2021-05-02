import React from 'react';
import style from './Header.module.css';
import logo from '../../logos/header_logo.png';
import {NavLink} from 'react-router-dom';

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
}

const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <header className={style.header}>
            <img src={logo} alt="logo"/>
            <div className={style.loginBlock}>
                {props.isAuth
                    ? props.login
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
};

export default Header;