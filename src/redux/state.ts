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
    dialogs: Array<DialogContentType>
    messages: Array<MessageContentType>
}
export type ProfilePageType = {
    posts: Array<PostsContentType>
}

export type RootStateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}

export const state: RootStateType = {

    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Artem'},
            {id: 2, name: 'Valera'},
            {id: 3, name: 'Nikita'},
            {id: 4, name: 'Sasha'},
            {id: 5, name: 'Lesha'}
        ],

        messages:  [
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
        ]
    }
}

export const addPost = (postText: string) => {
    debugger
    const newPost: PostsContentType = {
        id: new Date().getTime(),
        message: postText,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost);
}