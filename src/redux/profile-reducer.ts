import {ActionsTypes, AppThunk} from './redux-store';
import {usersAPI} from '../api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

export type PostsContentType = {
    id: number
    message: string
    likesCount: number
};

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}


let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It is my first post', likesCount: 11 },
        { id: 3, message: 'Dadadad', likesCount: 3 }
    ] as Array<PostsContentType>,
    newPostValue: '',
    profile: null as ProfileType | null
};

export type ProfilePageType = typeof initialState;


export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostsContentType = {
                id: new Date().getTime(),
                message: state.newPostValue,
                likesCount: 0
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostValue: ''
            };
        case UPDATE_NEW_POST_TEXT:
            return { ...state, newPostValue: action.newValue };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
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

export type SetUserProfileTypeAC = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}


export const setUserProfile = (profile: ProfileType): SetUserProfileTypeAC => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const;
}

export const getUserProfile = (userId: number): AppThunk => {
    return (dispatch) => {
        usersAPI.getUserProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response))
            })
    }
}