import {AppStateType, AppThunk} from './redux-store';
import {profileAPI} from '../api/api';
import {ProfileFormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {stopSubmit} from "redux-form";


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
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}


let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It is my first post', likesCount: 11},
        {id: 3, message: 'Dadadad', likesCount: 3}
    ] as Array<PostsContentType>,
    profile: null as ProfileType | null,
    status: null as string | null
};

export type ProfilePageType = typeof initialState;


export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionsType): ProfilePageType => {
    switch (action.type) {
        case 'DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}
        case 'social-network/profile/ADD-POST':
            const newPost: PostsContentType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        case 'social-network/profile/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'social-network/profile/SET_USER_STATUS':
            return {
                ...state,
                status: action.status
            }
        case "social-network/profile/SET_PHOTO_SUCCESS":
            return {
                ...state,
                //@ts-ignore
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
};


export const addPostAC = (newPostText: string) => {
    return {
        type: 'social-network/profile/ADD-POST',
        newPostText
    } as const;
};
export const deletePostAC = (id: number) => {
    return {
        type: 'DELETE_POST',
        id
    } as const;
};

export const setUserProfile = (profile: ProfileType) => {
    return {
        type: 'social-network/profile/SET_USER_PROFILE',
        profile
    } as const;
}

export const setUserStatus = (status: string) => {
    return {
        type: 'social-network/profile/SET_USER_STATUS',
        status
    } as const;
}
export const savePhotoSuccess = (photos: PhotosType) => {
    return {
        type: 'social-network/profile/SET_PHOTO_SUCCESS',
        photos
    } as const
}


export type ProfileActionsType = ReturnType<typeof setUserStatus>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof savePhotoSuccess>

//Thunks
export const getUserProfile = (userId: string): AppThunk => async (dispatch) => {
    const response = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(response))
}

export const getUserStatus = (userId: number): AppThunk => async (dispatch) => {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(response.data))
}

export const updateUserStatus = (status: string): AppThunk => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const savePhoto = (file: File): AppThunk => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (formData: ProfileFormDataType): AppThunk =>
    async (dispatch, getState: () => AppStateType) => {
        const userId = getState().auth.userId

        const response = await profileAPI.saveProfile(formData);
        if (response.data.resultCode === 0) {
            if(userId) {
                dispatch(getUserProfile(userId))
            }
        } else {
            const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit('edit-profile', {_error: message}))
            return Promise.reject(message)
        }
    }