import {AppStateType, BaseThunkType, InferActionsTypes} from './redux-store';
import {ResultCodes} from '../api/api';
import {ProfileFormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {FormAction, stopSubmit} from "redux-form";
import {profileAPI} from "../api/profile-api";


export type PostsContentType = {
    id: number
    message: string
    likesCount: number
}
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


const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It is my first post', likesCount: 11},
        {id: 3, message: 'Dadadad', likesCount: 3}
    ] as Array<PostsContentType>,
    profile: null as ProfileType | null,
    status: null as string | null
};


export const profileReducer = (state: InitialProfileStateType = initialState, action: ProfileActionsType): InitialProfileStateType => {
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
}

export const profileActions = {
    addPostAC: (newPostText: string) => ({type: 'social-network/profile/ADD-POST', newPostText} as const),
    deletePostAC: (id: number) => ({type: 'DELETE_POST', id} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'social-network/profile/SET_USER_PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'social-network/profile/SET_USER_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'social-network/profile/SET_PHOTO_SUCCESS', photos} as const)
}





//Thunks
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    try {
        const response = await profileAPI.getUserProfile(userId)
        dispatch(profileActions.setUserProfile(response))
    } catch (error) {
        console.log(error)
    }
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    try {
        const userStatus = await profileAPI.getUserStatus(userId)
        dispatch(profileActions.setUserStatus(userStatus))
    } catch (error) {
        console.log(error)
    }
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const responseData = await profileAPI.updateStatus(status)

        if (responseData.resultCode === ResultCodes.Success) {
            dispatch(profileActions.setUserStatus(status))
        }
    } catch (error) {
        console.log(error)
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    try {
        const responseData = await profileAPI.savePhoto(file)

        if (responseData.resultCode === ResultCodes.Success) {
            dispatch(profileActions.savePhotoSuccess(responseData.data.photos))
        }
    } catch (error) {
        console.log(error)
    }
}

export const saveProfile = (formData: ProfileFormDataType): ThunkType =>
    async (dispatch, getState: () => AppStateType) => {
        const userId = getState().auth.userId
        try {
            const responseData = await profileAPI.saveProfile(formData);
            if (responseData.resultCode === ResultCodes.Success) {
                if (userId) {
                    dispatch(getUserProfile(userId))
                }
            } else {
                const message = responseData.messages.length > 0 ? responseData.messages[0] : 'Some error';
                dispatch(stopSubmit('edit-profile', {_error: message}))
                return Promise.reject(message)
            }
        } catch (error) {
            console.log(error)
        }
    }

//types
export type InitialProfileStateType = typeof initialState;
export type ProfileActionsType = InferActionsTypes<typeof profileActions>;
type ThunkType = BaseThunkType<ProfileActionsType | FormAction>;

