import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {
    profileReducer,
    ProfileActionsType
} from './profile-reducer';
import { DialogsActionsTypes, dialogsReducer} from './dialogs-reducer';
import {usersReducer, UsersActionTypes} from './usersReducer';
import {AuthActionsTypes, authReducer} from './auth-reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {AppActionsTypes, appReducer} from './app-reducer';


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export type StoreType = typeof store;
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;


export type ActionsTypes =  UsersActionTypes
    | DialogsActionsTypes
    | AuthActionsTypes
    | ProfileActionsType
    | AppActionsTypes


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsTypes>;

//@ts-ignore
window.store = store

export default store;

