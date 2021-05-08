import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from './../../common/Pleloader/Preloader'
import { ProfileType } from '../../../redux/profile-reducer';
import {ProfileStatus} from "./ProfileStatus"

type ProfileInfoPropsType = {
    profile: ProfileType | null
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return (

            <Preloader/> 
       )
    }

    return (
        <div className={style.profileInfo}>
            {/*<img className={style.backgroundImage} src="https://fotorelax.ru/wp-content/uploads/2016/03/Beautiful-photos-and-pictures-on-various-subjects-01-1024x640.jpg" alt="background" />*/}
            <div className={style.descriptionBlock}>
                <img className={style.userAvatar} src={props.profile.photos.large || 'https://img.icons8.com/bubbles/2x/user-male.png'} alt="user"/>
                <ProfileStatus status={'Hello my friends!'}/>
            </div>
        </div>
    )
};

export default ProfileInfo;