import {BaseThunkType, InferActionsTypes} from './redux-store';
import {authMe} from './auth-reducer';


const initialState = {
    initialized: false
};


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
export const appActions = {
    initializedSuccess: () => ({type: 'social-network/app/INITIALIZED-SUCCESS'} as const)
}


//Thunks
export const initializeApp = (): ThunkType  => async (dispatch) => {
    try {
        const promise = dispatch(authMe());
        await Promise.all([promise])
        dispatch(appActions.initializedSuccess())
    } catch(error) {
        console.log(error)
    }
}
//types
type InitialAppStateType = typeof initialState;
export type AppActionsTypes = InferActionsTypes<typeof appActions>;
type ThunkType = BaseThunkType<AppActionsTypes>