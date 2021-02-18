import React from 'react';
import style from './Profile.module.css';
import MyPosts from '../MyPosts/MyPosts';


const Profile = () => {
    return (
        <main className={style.mainContent}>
            <img src="https://fotorelax.ru/wp-content/uploads/2016/03/Beautiful-photos-and-pictures-on-various-subjects-01-1024x640.jpg" alt="background picture" />
            Main content
            <MyPosts/>
        </main>
    )
};

export default Profile;