import {ActionsTypes} from './redux-store';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export type PostsContentType = {
    id: number
    message: string
    likesCount: number
};

export type ProfilePageType = {
    posts: Array<PostsContentType>
    newPostValue: string
};

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It is my first post', likesCount: 11},
        {id: 3, message: 'Dadadad', likesCount: 3}
    ],
    newPostValue: 'it-kamasutra',
}


export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
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

export type AddPostACType = {
    type: typeof ADD_POST
}

export const addPostAC = (): AddPostACType => {
    return {
        type: ADD_POST
    } as const;
};

export type UpdatePostTextACType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newValue: string
}

export const onPostCahngeAC = (newValue: string): UpdatePostTextACType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newValue
    } as const;
};