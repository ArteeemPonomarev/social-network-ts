import React from 'react';
import {ActionsTypes, StoreType} from '../../../redux/redux-store';
import {addPostAC, onPostCahngeAC, PostsContentType} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import StoreContext from '../../../StoreContext';



const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer>
            {
            (store) => {

                let state = store.getState();

                const addPostContainer = () => {
                    store.dispatch(addPostAC());
                };

                const onPostChange = (text: string) => {
                    store.dispatch(onPostCahngeAC(text));
                };
                return (
                    <MyPosts addPostContainer={addPostContainer}
                             onPostChangeContainer={onPostChange}
                             posts={state.profilePage.posts}
                             newPostValue={state.profilePage.newPostValue}/>)
            }
        }
        </StoreContext.Consumer>
    )
};

export default MyPostsContainer;