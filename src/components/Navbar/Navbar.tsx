import React from 'react';
import style from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={style.nav}>
            <ul>
                <a className={`${style.item} ${style.active}`} href="#">Profile</a>
                <a className={style.item} href="#">Messages</a>
                <a className={style.item} href="#">News</a>
                <a className={style.item} href="#">Music</a>
                <a className={style.item} href="#">Settings</a>
            </ul>
        </nav>
    )
};

export default Navbar;