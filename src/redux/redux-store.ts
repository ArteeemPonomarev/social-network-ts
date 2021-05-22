import {applyMiddleware, combineReducers, createStore} from 'redux';
import {
    AddPostACType,
    profileReducer,
    SetUserProfileTypeAC,
    SetStatusACType
} from './profile-reducer';
import {AddMessageACType, dialogsReducer} from './dialogs-reducer';
import {usersReducer, UsersActionTypes} from './usersReducer';
import {authReducer, SetUserDataType} from './auth-reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type StoreType = typeof store;

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>


export type ActionsTypes =  UsersActionTypes
    | AddPostACType
    | AddMessageACType
    | SetUserProfileTypeAC
    | SetUserDataType
    | SetStatusACType;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsTypes>;

//@ts-ignore
window.store = store
export default store;

