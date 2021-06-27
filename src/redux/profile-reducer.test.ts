import {addPostAC, deletePostAC, PostsContentType, profileReducer, ProfileType} from './profile-reducer';


    let state = {
        posts: [
            { id: 1, message: 'Hi, how are you?', likesCount: 12 },
            { id: 2, message: 'It is my first post', likesCount: 11 },
            { id: 3, message: 'Dadadad', likesCount: 3 }
        ] as Array<PostsContentType>,
        profile: null as ProfileType | null,
        status: null as string | null
    };

it ('length of posts should be correct', () => {
    //1. start data
    let action = addPostAC('test post')

    //2.action
    let newState = profileReducer(state, action);

    //3.expectation
    expect(newState.posts.length).toBe(4)
})

it ('message of new post should be correct', () => {
    //1. start data
    let action = addPostAC('test post')

    //2.action
    let newState = profileReducer(state, action);

    //3.expectation
    expect(newState.posts[3].message).toBe('test post')
})

it ('after deleting length of messages should be decremented', () => {
    //1. start data
    let action = deletePostAC(1)

    //2.action
    let newState = profileReducer(state, action);

    //3.expectation
    expect(newState.posts.length).toBe(2)
})