import {combineReducers, createStore} from 'redux';
import {AddPostACType, profileReducer, UpdatePostTextACType, SetUserProfileTypeAC} from './profile-reducer';
import {AddMessageACType, dialogsReducer, UpdateDialogTextACType} from './dialogs-reducer';
import {
    FollowACType,
    SetCurrentPageACType,
    SetTotalUsersCountACType,
    SetUsersACType,
    UnfollowACType,
    usersReducer,
    SetIsFetchingACType, SetFollowingProgressACType
} from './usersReducer';
import {authReducer, SetUserDataType} from './auth-reducer';


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer
});

let store = createStore(rootReducer);

export type StoreType = typeof store;

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>


export type ActionsTypes = AddPostACType
    | UpdatePostTextACType
    | AddMessageACType
    | UpdateDialogTextACType
    | FollowACType
    | UnfollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetTotalUsersCountACType
    | SetIsFetchingACType
    | SetUserProfileTypeAC
    | SetUserDataType
    | SetFollowingProgressACType;

//@ts-ignore
window.store = store
export default store;

