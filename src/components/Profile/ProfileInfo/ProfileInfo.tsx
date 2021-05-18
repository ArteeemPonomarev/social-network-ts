import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from './../../common/Pleloader/Preloader'
import { ProfileType } from '../../../redux/profile-reducer';
import {ProfileStatus} from "./ProfileStatus"

type ProfileInfoPropsType = {
    profile: ProfileType | null
    updateUserStatus: (status: string) => void
    status: string | null
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return (

            <Preloader/> 
       )
    }



    return (
        <div className={style.profileInfo}>
            <div className={style.descriptionBlock}>
                <img className={style.userAvatar} src={props.profile.photos.large || 'https://img.icons8.com/bubbles/2x/user-male.png'} alt="user"/>
                <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
            </div>
        </div>
    )
};

export default ProfileInfo;