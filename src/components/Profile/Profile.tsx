import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { ProfileType } from '../../redux/profile-reducer';

type ProfilePropsType = {
    profile: ProfileType | null
    updateUserStatus: (status: string) => void
    status: string | null
}

const Profile: React.FC<ProfilePropsType> = ({profile, status, updateUserStatus}) => {

    return (
        <div>
            <ProfileInfo profile={profile} status={status} updateUserStatus={updateUserStatus}/>
            <MyPostsContainer />
        </div>
    )
};

export default Profile;