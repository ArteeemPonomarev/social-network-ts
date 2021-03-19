import {combineReducers, createStore} from 'redux';
import {AddPostACType, profileReducer, UpdatePostTextACType} from './profile-reducer';
import {AddMessageACType, dialogsReducer, UpdateDialogTextACType} from './dialogs-reducer';


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
});

let store = createStore(rootReducer);

export type StoreType = typeof store;

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>


export type ActionsTypes = AddPostACType | UpdatePostTextACType | AddMessageACType | UpdateDialogTextACType;

export default store;

