// import {AddPostACType, profileReducer, UpdatePostTextACType} from './profile-reducer';
// import {AddMessageACType, dialogsReducer, UpdateDialogTextACType} from './dialogs-reducer';
//
//
// export type DialogContentType = {
//     id: number
//     name: string
// };
//
// export type MessageContentType = {
//     id: number
//     message: string
// };
//
// export type PostsContentType = {
//     id: number
//     message: string
//     likesCount: number
// };
//
// export type DialogsPageType = {
//     newDialogMessageText: string
//     dialogs: Array<DialogContentType>
//     messages: Array<MessageContentType>
// };
//
// export type ProfilePageType = {
//     posts: Array<PostsContentType>
//     newPostValue: string
// };
//
// export type RootStateType = {
//     dialogsPage: DialogsPageType
//     profilePage: ProfilePageType
// };
//
// type StoreType = {
//     _state: RootStateType
//     getState: () => RootStateType
//     subscribe: (observer: () => void) => void
//     _callSubscriber: () => void
//     dispatch: (action: ActionsTypes) => void
// };
//
// export type ActionsTypes = AddPostACType | UpdatePostTextACType | AddMessageACType | UpdateDialogTextACType;
//
// export let store: StoreType = {
//     _state: {
//         dialogsPage: {
//             newDialogMessageText: '',
//             dialogs: [
//                 {id: 1, name: 'Artem'},
//                 {id: 2, name: 'Valera'},
//                 {id: 3, name: 'Nikita'},
//                 {id: 4, name: 'Sasha'},
//                 {id: 5, name: 'Lesha'}
//             ],
//
//             messages: [
//                 {id: 1, message: 'Hi'},
//                 {id: 2, message: 'How is your succes?'},
//                 {id: 3, message: 'Yeeeah'}
//             ],
//         },
//
//         profilePage: {
//             posts: [
//                 {id: 1, message: 'Hi, how are you?', likesCount: 12},
//                 {id: 2, message: 'It is my first post', likesCount: 11},
//                 {id: 3, message: 'Dadadad', likesCount: 3}
//             ],
//             newPostValue: 'it-kamasutra',
//         }
//     },
//     getState() {
//         return this._state
//     },
//     _callSubscriber() {
//         console.log('State was changed');
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer;
//     },
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage,action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//         this._callSubscriber();
//     }
// };


export let a = 1;