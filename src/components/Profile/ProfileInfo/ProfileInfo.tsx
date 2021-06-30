import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from './../../common/Pleloader/Preloader'
import {ProfileType} from '../../../redux/profile-reducer';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';

type ProfileInfoPropsType = {
    profile: ProfileType | null
    updateUserStatus: (status: string) => void
    status: string | null
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateUserStatus}) => {
    if (!profile) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className={style.profileInfo}>
            <div className={style.descriptionBlock}>
                <img className={style.userAvatar}
                     src={profile.photos.large || 'https://img.icons8.com/bubbles/2x/user-male.png'}
                     alt="user"/>
                <ProfileStatusWithHooks status={status}
                                        updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
};

export default ProfileInfo;