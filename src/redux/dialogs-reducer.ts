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

export const dialogsReducer = (state: DialogsPageType = initialState, action: DialogsActionsTypes): DialogsPageType => {
    switch (action.type) {
        case ADD_DIALOG_MESSAGE:
            const newDialogMessage = {
                id: new Date().getTime(),
                message: action.newMessageBody
            };
            return {...state, messages: [...state.messages, newDialogMessage]};
        default:
            return state;
    }
};


export const addMessageAC = (newMessageBody: string) => {
    return {
        type: ADD_DIALOG_MESSAGE,
        newMessageBody
    } as const;
};

export type DialogsActionsTypes =  ReturnType<typeof addMessageAC>
