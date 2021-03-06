import React from 'react';
import style from './ProfileInfo.module.css';



const ProfileInfo = () => {
    return (
        <div className={style.profileInfo}>
            <img src="https://fotorelax.ru/wp-content/uploads/2016/03/Beautiful-photos-and-pictures-on-various-subjects-01-1024x640.jpg" alt="background picture" />
            <div className={style.descriptionBlock}>
                ava+decription
            </div>
        </div>
    )
};

export default ProfileInfo;