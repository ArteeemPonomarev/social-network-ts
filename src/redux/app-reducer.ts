import {AppThunk} from './redux-store';
import {authMe} from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS';

export type AppDataType = {
    initialized: boolean
};

const initialState: AppDataType = {
    initialized: false
};


export const appReducer = (state: AppDataType = initialState, action: AppActionsTypes): AppDataType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
};

//Action Creators
export const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    } as const
}
export type AppActionsTypes = ReturnType<typeof initializedSuccess>

//Thunks

export const initializeApp = (): AppThunk  => (dispatch) => {
    const promise = dispatch(authMe());

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}