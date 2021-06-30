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
        case 'social-network/dialogs/ADD-DIALOG-MESSAGE':
            const newDialogMessage = {
                id: new Date().getTime(),
                message: action.newMessageBody
            };
            return {...state, messages: [...state.messages, newDialogMessage]};
        default:
            return state;
    }
};

//action creators
export const addMessageAC = (newMessageBody: string) => {
    return {
        type: 'social-network/dialogs/ADD-DIALOG-MESSAGE',
        newMessageBody
    } as const;
};


//types
type DialogContentType = {
    id: number
    name: string
};

type MessageContentType = {
    id: number
    message: string
};

export type DialogsActionsTypes =  ReturnType<typeof addMessageAC>