import React from 'react';
import style from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { ProfileType } from '../../redux/profile-reducer';

type ProfilePropsType = {
    profile: ProfileType | null
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
};

export default Profile;