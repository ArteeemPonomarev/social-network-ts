import {AppThunk} from './redux-store';
import {authApi} from '../api/api';
import {stopSubmit} from 'redux-form';

const SET_AUTH_USER_DATA = 'SET-USER_DATA';

// export type AuthDataType = {
//     userId: number | null
//     email: string | null
//     login: string | null
//     isAuth: boolean
// };

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

type InitialAuthState = typeof initialState


export const authReducer = (state: InitialAuthState = initialState, action: AuthActionsTypes): InitialAuthState => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
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
        type: SET_AUTH_USER_DATA,
        payload: {login, userId, email, isAuth}
    } as const
}
export type AuthActionsTypes = ReturnType<typeof setAuthUserData> | ReturnType<typeof stopSubmit>

//Thunks
export const authMe = (): AppThunk => {
    return (dispatch) => {
        return authApi.authMe()
            .then(response => {
                if (response.resultCode === 0) {
                    let {id, login, email} = response.data;
                    dispatch(setAuthUserData(id, email, login, true));
                }
            })
    }
}

export const login = (email: string, password: string, rememberMe = false): AppThunk => (dispatch) => {
    return authApi.login(email, password, rememberMe)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(authMe())
            } else {
                const message = response.messages.length > 0 ? response.messages[0] : 'Some error';
                dispatch(stopSubmit('login', {_error: message}))
            }
        })
}


export const logout = (): AppThunk => {
    return (dispatch) => {
        authApi.logout()
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
            })
    }
}