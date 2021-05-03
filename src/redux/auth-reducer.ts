import {ActionsTypes, AppThunk} from './redux-store';
import {authApi} from '../api/api';


const SET_AUTH_USER_DATA = 'SET-USER_DATA';


export type AuthDataType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
};

const initialState: AuthDataType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};


export const authReducer = (state: AuthDataType = initialState, action: ActionsTypes): AuthDataType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
};

export type SetUserDataType = {
    type: typeof SET_AUTH_USER_DATA,
    data: {
        userId: number
        email: string
        login: string
    }
}
export const setAuthUserData = (userId: number, email: string, login: string): SetUserDataType => {
    return {
        type: SET_AUTH_USER_DATA,
        data: {
            login,
            userId,
            email
        }
    }
}

export const authMe = (): AppThunk => {
    return (dispatch) => {
        authApi.authMe()
            .then(response => {
                if (response.resultCode === 0) {
                    let {id, login, email} = response.data;
                    dispatch(setAuthUserData(id, email, login));
                }
            })
    }
}