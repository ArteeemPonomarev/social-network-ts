import {AppThunk} from './redux-store';
import {authApi, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';


const initialState = {
    userId: null as null | string,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captchaUrl: null as null | string
};

type InitialAuthStateType = typeof initialState;


export const authReducer = (state: InitialAuthStateType = initialState, action: AuthActionsTypes): InitialAuthStateType => {
    switch (action.type) {
        case 'social-network/auth/SET-USER_DATA':
            return {
                ...state,
                ...action.payload
            }
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
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'social-network/auth/SET-USER_DATA',
        payload: {login, userId, email, isAuth}
    } as const
}
export const setCaptchaUrl = (captchaUrl: string) => {
    return {
        type: 'social-network/auth/GET-CAPTCHA-URL-SUCCESS',
        payload: {captchaUrl}
    } as const
}


//Thunks
export const authMe = (): AppThunk<Promise<void>> => async (dispatch) => {
    const response = await authApi.authMe()

    if (response.resultCode === 0) {
        let {id, login, email} = response.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe = false, captcha: string | null = null):
    AppThunk<Promise<void>> => async (dispatch) => {
    const response = await authApi.login(email, password, rememberMe, captcha)

    if (response.resultCode === 0) {
        dispatch(authMe())
    } else if (response.resultCode === 10) {
        dispatch(getCaptchaUrl())
    } else {
        const message = response.messages.length > 0 ? response.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = (): AppThunk<Promise<void>> =>
    async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(setCaptchaUrl(captchaUrl))
    }


export const logout = (): AppThunk<Promise<void>> => async (dispatch) => {
    const response = await authApi.logout()

    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

//types
export type AuthActionsTypes = ReturnType<typeof setAuthUserData>
    | ReturnType<typeof stopSubmit>
    | ReturnType<typeof setCaptchaUrl>