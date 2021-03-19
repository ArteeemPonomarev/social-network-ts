import React from 'react';
import style from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ActionsTypes} from '../../redux/redux-store';
import {ProfilePageType} from '../../redux/profile-reducer';
import store from '../../redux/redux-store';

type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void
};

const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer posts={props.profilePage.posts}
                     newPostValue={props.profilePage.newPostValue}
                     store={store}/>
        </div>
    )
};

export default Profile;