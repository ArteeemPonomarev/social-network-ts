import React from 'react';
import style from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={style.nav}>
            <ul>
                <NavLink className={style.item} activeClassName={style.activeLink} to="/profile">Profile</NavLink>
                <NavLink className={style.item} activeClassName={style.activeLink} to="/dialogs">Messages</NavLink>
                <NavLink className={style.item} activeClassName={style.activeLink} to="/users">Users</NavLink>
                <NavLink className={style.item} activeClassName={style.activeLink} to="/news">News</NavLink>
                <NavLink className={style.item} activeClassName={style.activeLink} to="/music">Music</NavLink>
                <NavLink className={style.item} activeClassName={style.activeLink} to="/settings">Settings</NavLink>
            </ul>
        </nav>
    )
};

export default Navbar;