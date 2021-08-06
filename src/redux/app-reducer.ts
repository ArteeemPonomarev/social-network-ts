import {AppThunk} from './redux-store';
import {authMe} from './auth-reducer';


const initialState = {
    initialized: false
};

type InitialAppStateType = typeof initialState;

export const appReducer = (state: InitialAppStateType = initialState, action: AppActionsTypes): InitialAppStateType => {
    switch (action.type) {
        case 'social-network/app/INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
};

//Action Creators
export const initializedSuccess = () => ({type: 'social-network/app/INITIALIZED-SUCCESS'} as const)

export type AppActionsTypes = ReturnType<typeof initializedSuccess>;

//Thunks
export const initializeApp = (): AppThunk  => (dispatch) => {
    const promise = dispatch(authMe());

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}