import React from 'react';
import style from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = () => {
    console.log('Profile rendered');

    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
};

export default Profile;