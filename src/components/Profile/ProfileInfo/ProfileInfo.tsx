import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './ProfileInfo.module.css';
import Preloader from './../../common/Pleloader/Preloader'
import {ProfileType} from '../../../redux/profile-reducer';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/userPhoto.png'
import {ProfileDataReduxForm, ProfileFormDataType} from "./ProfileDataForm";

type ProfileInfoPropsType = {
    profile: ProfileType | null
    updateUserStatus: (status: string) => void
    status: string | null
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileFormDataType) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = (
    {   profile,
        status,
        updateUserStatus,
        isOwner,
        savePhoto,
        saveProfile
    }) => {

    
    const [editMode, setEditMode] = useState<boolean>(false)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const onManiPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const choosenFiles = e.target.files
        if (choosenFiles && choosenFiles.length) {
            savePhoto(choosenFiles[0])
        }
    }

    const onSubmit = (formData: ProfileFormDataType) => {
        saveProfile(formData)
        setEditMode(false) // refactor later
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
                {editMode
                    ? <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} activateEditMode={activateEditMode}/>}

            </div>
        </div>
    )
};

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    activateEditMode: () => void
}

const ProfileData:React.FC<ProfileDataPropsType> = ({profile, isOwner, activateEditMode}) => {
    return (
        <div>
            {isOwner && <div><button onClick={activateEditMode}>Edit</button></div>}
            <div>
                <b>Full Name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a jod</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {
                profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contact:</b> {Object.keys(profile.contacts).map(key => {
                //@ts-ignore
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}




type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}

export const Contact: React.FC<ContactPropsType> = ({contactValue, contactTitle}) => {
    return (
        <div style={{marginLeft: '20px'}}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )
}

export default ProfileInfo;