import {rerenderEntireTree} from '../render';

export type DialogContentType = {
    id: number
    name: string
}

export type MessageContentType = {
    id: number
    message: string
}

export type PostsContentType = {
    id: number
    message: string
    likesCount: number
}

export type DialogsPageType = {
    newDialogMessageText: string
    dialogs: Array<DialogContentType>
    messages: Array<MessageContentType>
}
export type ProfilePageType = {
    posts: Array<PostsContentType>
    newPostValue: string
}

export type RootStateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}

export const state: RootStateType = {

    dialogsPage: {
        newDialogMessageText :'',
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
}

export const addPost = (postText: string) => {
    const newPost: PostsContentType = {
        id: new Date().getTime(),
        message: postText,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostValue = '';
    rerenderEntireTree(state);
}

export const addDialogMessage = (DialogMessageText: string) => {
    debugger
    const newDialogMessage = {
        id: new Date().getTime(),
        message: DialogMessageText,
    };
    state.dialogsPage.messages.push(newDialogMessage);
    state.dialogsPage.newDialogMessageText='';
    rerenderEntireTree(state);
}

export const onChangePostValue = (newValue: string) => {
    state.profilePage.newPostValue = newValue;
    rerenderEntireTree(state);
}
export const onNewDialogMessageChange = (newValue: string) => {
    state.dialogsPage.newDialogMessageText = newValue;
    rerenderEntireTree(state);
}