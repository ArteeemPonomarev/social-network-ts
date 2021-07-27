import React, { ChangeEvent } from 'react';
import style from './ProfileInfo.module.css';
import Preloader from './../../common/Pleloader/Preloader'
import {ProfileType} from '../../../redux/profile-reducer';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/userPhoto.png'

type ProfileInfoPropsType = {
    profile: ProfileType | null
    updateUserStatus: (status: string) => void
    status: string | null
    isOwner: boolean
    savePhoto: (file: File) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateUserStatus, isOwner,savePhoto}) => {

    const onManiPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const choosenFiles = e.target.files
        if (choosenFiles && choosenFiles.length) {
            savePhoto(choosenFiles[0])
        }
    }

    if (!profile) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className={style.profileInfo}>
            <div className={style.descriptionBlock}>
                <img className={style.userAvatar}
                     src={profile.photos.large || userPhoto}
                     alt="user"/>
                {isOwner && <input type={"file"} onChange={onManiPhotoSelected}/>}
                <ProfileStatusWithHooks status={status}
                                        updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
};

export default ProfileInfo;