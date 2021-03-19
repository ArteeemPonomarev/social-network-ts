import React from 'react';
import {ActionsTypes, StoreType} from '../../../redux/redux-store';
import {addPostAC, onPostCahngeAC, PostsContentType} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

type MyPostsContainerPropsType = {
    posts: Array<PostsContentType>
    newPostValue: string
    store: StoreType
};


const MyPostsContainer = (props: MyPostsContainerPropsType) => {

    let state = props.store.getState();

    const addPostContainer = () => {
        props.store.dispatch(addPostAC());
    };

    const onPostChange = (text: string) => {
        props.store.dispatch(onPostCahngeAC(text));
    };
    return (
        <MyPosts addPostContainer={addPostContainer}
                 onPostChangeContainer={onPostChange}
                 posts={state.profilePage.posts}
                 newPostValue={state.profilePage.newPostValue} />
    )
};

export default MyPostsContainer;