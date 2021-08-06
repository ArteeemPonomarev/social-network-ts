import {AppThunk} from './redux-store';
import {authApi, ResultCodes, securityAPI} from '../api/api';
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
const authActions = {
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
export const authMe = (): AppThunk<Promise<void>> => async (dispatch) => {
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
    AppThunk<Promise<void>> => async (dispatch) => {
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

export const getCaptchaUrl = (): AppThunk<Promise<void>> =>
    async (dispatch) => {
        try {
            const {url} = await securityAPI.getCaptchaUrl();
            dispatch(authActions.setCaptchaUrl(url))
        } catch (error) {
            console.log(error)
        }
    }


export const logout = (): AppThunk<Promise<void>> => async (dispatch) => {
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
export type AuthActionsTypes = ReturnType<typeof authActions.setAuthUserData>
    | ReturnType<typeof stopSubmit>
    | ReturnType<typeof authActions.setCaptchaUrl>