import React from 'react';
import {addPostAC, onPostCahngeAC, PostsContentType} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';
import {Dispatch} from 'redux';

type MapStatePropsType = {
    posts: Array<PostsContentType>
    newPostValue: string
};

type MapDispatchPropsType = {
    addPost: () => void
    onPostChange: (text: string) => void
};

export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType;

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostValue: state.profilePage.newPostValue
    };
};

let mapDispatchToProps = (dispatch: Dispatch):MapDispatchPropsType => {
    return {
        addPost: () => {
            dispatch(addPostAC());
        },
        onPostChange: (text: string) => {
            dispatch(onPostCahngeAC(text));
        }
    };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

// const MyPostsContainer = () => {
//
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//
//                     let state = store.getState();
//
//                     const addPostContainer = () => {
//                         store.dispatch(addPostAC());
//                     };
//
//                     const onPostChange = (text: string) => {
//                         store.dispatch(onPostCahngeAC(text));
//                     };
//                     return (
//                         <MyPosts addPost={addPostContainer}
//                                  onPostChange={onPostChange}
//                                  posts={state.profilePage.posts}
//                                  newPostValue={state.profilePage.newPostValue}/>)
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// };