import {ActionsTypes, DialogsPageType} from './state';

const UPDATE_NEW_DIALOG_VALUE = 'UPDATE-NEW-DIALOG-VALUE';
const ADD_DIALOG_MESSAGE = 'ADD-DIALOG-MESSAGE';


export const dialogsReducer = (state: DialogsPageType, action: ActionsTypes): DialogsPageType => {
    switch (action.type) {
        case ADD_DIALOG_MESSAGE:
            const newDialogMessage = {
                id: new Date().getTime(),
                message: state.newDialogMessageText
            };
            state.messages.push(newDialogMessage);
            state.newDialogMessageText = '';
            return state;
        case UPDATE_NEW_DIALOG_VALUE:
            state.newDialogMessageText = action.newValue;
            return state;
        default:
            return state;
    }
};