import {ActionsTypes} from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

type PhotosType = {
    small: null | string
    large: null | string
};
export type UserType2 = {
    id: number,
    name: string,
    status?: null |string
    photos: PhotosType
    followed: boolean
    uniqueUrlName: null | string

};
export type UserType = {
    id: number
    name: string
    uniqueUrlName: null | string
    photos: PhotosType
    status: null | string
    followed: boolean
}

export type UsersPageType = {
    users: Array<UserType>
};

const initialState: UsersPageType = {
    users: []
};



export const usersReducer = (state: UsersPageType = initialState, action: ActionsTypes): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u =>  {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u =>  {
                    if (u.id === action.id) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        default:
            return state;
    }
};

export type FollowACType = {
    type: typeof FOLLOW
    id: number
}

export const followAC = (id: number): FollowACType => {
    return {
        type: FOLLOW,
        id
    } as const;
};

export type UnfollowACType = {
    type: typeof UNFOLLOW
    id: number
}

export const unfollowAC = (id: number): UnfollowACType => {
    return {
        type: UNFOLLOW,
        id
    } as const;
};

export type SetUsersACType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export const setUsersAc = (users: Array<UserType>): SetUsersACType => {
    return {
        type: SET_USERS,
        users
    } as const;
};
