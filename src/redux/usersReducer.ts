import {AppThunk} from './redux-store';
import {usersAPI} from '../api/api';


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

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
    followingInProgress: Array<number>
};

const initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 21,
    currentPage: 2,
    isFetching: false,
    followingInProgress: []
};


export const usersReducer = (state: UsersPageType = initialState, action: UsersActionTypes): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
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
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};


export const follow = (id: number) => {
    return {
        type: FOLLOW,
        id
    } as const;
};

export const unfollow = (id: number) => {
    return {
        type: UNFOLLOW,
        id
    } as const;
};


export const setUsers = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        users
    } as const;
};

export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const;
}

export const setTotalUsersCount = (totalCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalCount
    } as const;
}

export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const;
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        userId,
        isFetching
    } as const;
}

export type UsersActionTypes = ReturnType<typeof follow>
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>


export const getUsers = (currentPage: number, pageSize: number): AppThunk => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize)
            .then(response => {
                dispatch(toggleIsFetching(false))
                dispatch(setTotalUsersCount(response.totalCount))
                dispatch(setUsers(response.items))
            })
    }
}
export const followUser = (userId: number): AppThunk => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersAPI.follow(userId)
            .then(response => {
                if(response.resultCode === 0) {
                    dispatch(follow(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}
export const unfollowUser = (userId: number): AppThunk => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersAPI.unfollow(userId)
            .then(response => {
                if(response.resultCode === 0) {
                    dispatch(unfollow(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}
