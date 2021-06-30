import {AppThunk} from './redux-store';
import {authApi} from '../api/api';
import {stopSubmit} from 'redux-form';


const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

type InitialAuthState = typeof initialState


export const authReducer = (state: InitialAuthState = initialState, action: AuthActionsTypes): InitialAuthState => {
    switch (action.type) {
        case 'social-network/auth/SET-USER_DATA':
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


//Thunks
export const authMe = (): AppThunk => async (dispatch) => {
    const response = await authApi.authMe()

    if (response.resultCode === 0) {
        let {id, login, email} = response.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe = false): AppThunk => async (dispatch) => {
    const response = await authApi.login(email, password, rememberMe)

    if (response.resultCode === 0) {
        dispatch(authMe())
    } else {
        const message = response.messages.length > 0 ? response.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}))
    }
}


export const logout = (): AppThunk => async (dispatch) => {
    const response = await authApi.logout()

    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

//types
export type AuthActionsTypes = ReturnType<typeof setAuthUserData> | ReturnType<typeof stopSubmit>