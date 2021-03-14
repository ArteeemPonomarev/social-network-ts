import {ActionsTypes, PostsContentType, ProfilePageType} from './state';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';


export const profileReducer = (state: ProfilePageType, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostsContentType = {
                id: new Date().getTime(),
                message: state.newPostValue,
                likesCount: 0
            };
            state.posts.push(newPost);
            state.newPostValue = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostValue = action.newValue;
            return state;
        default:
            return state;
    }
};