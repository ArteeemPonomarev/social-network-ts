import {applyMiddleware, combineReducers, createStore} from 'redux';
import {
    AddPostACType,
    profileReducer,
    UpdatePostTextACType,
    SetUserProfileTypeAC,
    SetStatusACType
} from './profile-reducer';
import {AddMessageACType, dialogsReducer, UpdateDialogTextACType} from './dialogs-reducer';
import {usersReducer, UsersActionTypes} from './usersReducer';
import {authReducer, SetUserDataType} from './auth-reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type StoreType = typeof store;

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>


export type ActionsTypes =  UsersActionTypes
    | AddPostACType
    | UpdatePostTextACType
    | AddMessageACType
    | UpdateDialogTextACType
    | SetUserProfileTypeAC
    | SetUserDataType
    | SetStatusACType;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsTypes>;

//@ts-ignore
window.store = store
export default store;

