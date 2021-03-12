const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_DIALOG_VALUE = 'UPDATE-NEW-DIALOG-VALUE';
const ADD_DIALOG_MESSAGE = 'ADD-DIALOG-MESSAGE';

export type DialogContentType = {
    id: number
    name: string
};

export type MessageContentType = {
    id: number
    message: string
};

export type PostsContentType = {
    id: number
    message: string
    likesCount: number
};

export type DialogsPageType = {
    newDialogMessageText: string
    dialogs: Array<DialogContentType>
    messages: Array<MessageContentType>
};

export type ProfilePageType = {
    posts: Array<PostsContentType>
    newPostValue: string
};

export type RootStateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
};

type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    subscribe: (observer: () => void) => void
    _callSubscriber: () => void
    dispatch: (action: ActionsTypes) => void
};

export type ActionsTypes = ReturnType<typeof addPostAC> | ReturnType<typeof onDialogMessageChangeAC> | ReturnType<typeof addMessageAC> | ReturnType<typeof onPostCahngeAC>;

export let store: StoreType = {
    _state: {
        dialogsPage: {
            newDialogMessageText: '',
            dialogs: [
                {id: 1, name: 'Artem'},
                {id: 2, name: 'Valera'},
                {id: 3, name: 'Nikita'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Lesha'}
            ],

            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your succes?'},
                {id: 3, message: 'Yeeeah'}
            ],
        },

        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'It is my first post', likesCount: 11},
                {id: 3, message: 'Dadadad', likesCount: 3}
            ],
            newPostValue: 'it-kamasutra',
        }
    },
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('State was changed');
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            const newPost: PostsContentType = {
                id: new Date().getTime(),
                message: this._state.profilePage.newPostValue,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostValue = '';
            this._callSubscriber();
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostValue = action.newValue;
            this._callSubscriber();
        } else if (action.type === ADD_DIALOG_MESSAGE) {
            const newDialogMessage = {
                id: new Date().getTime(),
                message: this._state.dialogsPage.newDialogMessageText
            };
            this._state.dialogsPage.messages.push(newDialogMessage);
            this._state.dialogsPage.newDialogMessageText = '';
            this._callSubscriber();
        } else if (action.type === UPDATE_NEW_DIALOG_VALUE) {
            this._state.dialogsPage.newDialogMessageText = action.newValue;
            this._callSubscriber();
        }
    }
};

export const addMessageAC = () => {
    return {
        type: 'ADD-DIALOG-MESSAGE'
    } as const;
};

export const onDialogMessageChangeAC = (newValue: string) => {
    return {
        type: 'UPDATE-NEW-DIALOG-VALUE',
        newValue
    } as const;
};

export const addPostAC = () => {
    return {
        type:'ADD-POST'
    } as const;
};

export const onPostCahngeAC = (newValue: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newValue
    } as const;
};

