import {ActionsTypes} from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

type PhotosType = {
    small: null | string
    large: null | string
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
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
};

const initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 21,
    currentPage: 2,
    isFetching: false
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
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
                return {
                    ...state,
                    isFetching: action.isFetching
                }
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

export type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPageAC = (currentPage: number): SetCurrentPageACType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const;
}

export type SetTotalUsersCountACType = {
        type: typeof SET_TOTAL_USERS_COUNT
        totalCount: number
}

export const setTotalUsersCountAC = (totalCount: number): SetTotalUsersCountACType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalCount
    }
}

export type SetIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const setIsFetchingAC = (isFetching: boolean): SetIsFetchingACType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}