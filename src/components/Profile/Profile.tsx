import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { ProfileType } from '../../redux/profile-reducer';
import {ProfileFormDataType} from "./ProfileInfo/ProfileDataForm";

type ProfilePropsType = {
    profile: ProfileType | null
    updateUserStatus: (status: string) => void
    status: string | null
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileFormDataType) => void
}

const Profile: React.FC<ProfilePropsType> = (
    {profile,
        status,
        updateUserStatus,
        isOwner,
        savePhoto,
        saveProfile
    }) => {

    return (
        <div>
            <ProfileInfo profile={profile} isOwner={isOwner} status={status}
                         updateUserStatus={updateUserStatus} savePhoto={savePhoto} saveProfile={saveProfile}/>
            <MyPostsContainer />
        </div>
    )
};

export default Profile;