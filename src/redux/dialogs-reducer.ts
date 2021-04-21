import {ActionsTypes} from './redux-store';

const UPDATE_NEW_DIALOG_VALUE = 'UPDATE-NEW-DIALOG-VALUE';
const ADD_DIALOG_MESSAGE = 'ADD-DIALOG-MESSAGE';


type DialogContentType = {
    id: number
    name: string
};

type MessageContentType = {
    id: number
    message: string
};


const initialState = {
    newDialogMessageText: '',
    dialogs: [
        {id: 1, name: 'Artem'},
        {id: 2, name: 'Valera'},
        {id: 3, name: 'Nikita'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Lesha'}
    ] as Array<DialogContentType>,

    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your succes?'},
        {id: 3, message: 'Yeeeah'}
    ] as Array<MessageContentType>,
};

export type DialogsPageType = typeof initialState;


export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes): DialogsPageType => {
    switch (action.type) {
        case ADD_DIALOG_MESSAGE:
            const newDialogMessage = {
                id: new Date().getTime(),
                message: state.newDialogMessageText
            };
            return {...state, newDialogMessageText: '', messages: [...state.messages, newDialogMessage]};
        case UPDATE_NEW_DIALOG_VALUE:
            return {...state, newDialogMessageText: action.newValue};
        default:
            return state;
    }
};

export type AddMessageACType = {
    type: typeof ADD_DIALOG_MESSAGE
}

export const addMessageAC = (): AddMessageACType => {
    return {
        type: ADD_DIALOG_MESSAGE
    } as const;
};

export type UpdateDialogTextACType = {
    type: typeof UPDATE_NEW_DIALOG_VALUE
    newValue: string
}

export const onDialogMessageChangeAC = (newValue: string): UpdateDialogTextACType => {
    return {
        type: UPDATE_NEW_DIALOG_VALUE,
        newValue
    } as const;
};