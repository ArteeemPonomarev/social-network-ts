import {BaseThunkType, InferActionsTypes} from './redux-store';
import {ResultCodes} from '../api/api';
import {FormAction, stopSubmit} from 'redux-form';
import {authApi} from "../api/auth-api";
import {securityAPI} from "../api/security-api";


const initialState = {
    userId: null as (null | number),
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captchaUrl: null as null | string
};


export const authReducer = (state: InitialAuthStateType = initialState, action: AuthActionsType): InitialAuthStateType => {
    switch (action.type) {
        case 'social-network/auth/SET-USER_DATA':
        case 'social-network/auth/GET-CAPTCHA-URL-SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

//Action Creators
export const authActions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
        return {
            type: 'social-network/auth/SET-USER_DATA',
            payload: {login, userId, email, isAuth}
        } as const
    },
    setCaptchaUrl: (captchaUrl: string) => {
        return {
            type: 'social-network/auth/GET-CAPTCHA-URL-SUCCESS',
            payload: {captchaUrl}
        } as const
    },
}




//Thunks
export const authMe = (): ThunkType => async (dispatch) => {
    try {
        const autMeData = await authApi.authMe()

        if (autMeData.resultCode === ResultCodes.Success) {
            let {id, login, email} = autMeData.data;
            dispatch(authActions.setAuthUserData(id, email, login, true));
        }
    } catch (error) {
        console.log(error)
    }
}

export const login = (email: string, password: string, rememberMe = false, captcha: string | null = null):
    ThunkType => async (dispatch) => {
    try {
        const loginData = await authApi.login(email, password, rememberMe, captcha)

        if (loginData.resultCode === ResultCodes.Success) {
            dispatch(authMe())
        } else if (loginData.resultCode === ResultCodes.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        } else {
            const message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}))
        }
    } catch (error) {
        console.log(error)
    }
}

export const getCaptchaUrl = (): ThunkType =>
    async (dispatch) => {
        try {
            const {url} = await securityAPI.getCaptchaUrl();
            dispatch(authActions.setCaptchaUrl(url))
        } catch (error) {
            console.log(error)
        }
    }


export const logout = (): ThunkType => async (dispatch) => {
    try {
        const response = await authApi.logout()

        if (response.resultCode === ResultCodes.Success) {
            dispatch(authActions.setAuthUserData(null, null, null, false))
        }
    } catch (error) {
        console.log(error)
    }
}

//types
type InitialAuthStateType = typeof initialState;
type AuthActionsType = InferActionsTypes<typeof authActions>;
type ThunkType = BaseThunkType<AuthActionsType | FormAction>