import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { ProfileType } from '../../redux/profile-reducer';

type ProfilePropsType = {
    profile: ProfileType | null
    updateUserStatus: (status: string) => void
    status: string | null
    isOwner: boolean
    savePhoto: (file: File) => void
}

const Profile: React.FC<ProfilePropsType> = (
    {profile,
        status,
        updateUserStatus,
        isOwner,savePhoto
    }) => {

    return (
        <div>
            <ProfileInfo profile={profile} isOwner={isOwner} status={status}
                         updateUserStatus={updateUserStatus} savePhoto={savePhoto}/>
            <MyPostsContainer />
        </div>
    )
};

export default Profile;