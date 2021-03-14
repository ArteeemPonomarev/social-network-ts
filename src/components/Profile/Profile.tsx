import React from 'react';
import style from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ActionsTypes} from '../../redux/redux-store';
import {ProfilePageType} from '../../redux/profile-reducer';

type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void
};

const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostValue={props.profilePage.newPostValue}
                     dispatch={props.dispatch}/>
        </div>
    )
};

export default Profile;