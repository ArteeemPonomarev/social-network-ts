import {AppThunk} from './redux-store';
import {usersAPI} from '../api/api';
import {Dispatch} from 'redux';
import {updateObjectInArray} from '../utils/object-helpers';


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


const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

type initialStateType = typeof initialState;

export const usersReducer = (state: initialStateType = initialState, action: UsersActionTypes): initialStateType => {
    switch (action.type) {
        case 'social-network/users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, 'id', {followed: true})
            };
        case 'social-network/users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, 'id', {followed: false})
            };
        case 'social-network/users/SET-USERS':
            return {
                ...state,
                users: action.users
            };
        case 'social-network/users/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'social-network/users/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case 'social-network/users/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS':
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
        type: 'social-network/users/FOLLOW',
        id
    } as const;
};

export const unfollow = (id: number) => {
    return {
        type: 'social-network/users/UNFOLLOW',
        id
    } as const;
};

export const setUsers = (users: Array<UserType>) => {
    return {
        type: 'social-network/users/SET-USERS',
        users
    } as const;
};

export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'social-network/users/SET_CURRENT_PAGE',
        currentPage
    } as const;
}

export const setTotalUsersCount = (totalCount: number) => {
    return {
        type: 'social-network/users/SET_TOTAL_USERS_COUNT',
        totalCount
    } as const;
}

export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'social-network/users/TOGGLE_IS_FETCHING',
        isFetching
    } as const;
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS',
        userId,
        isFetching
    } as const;
}



export const requestUsers = (page: number, pageSize: number): AppThunk => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    const response = await usersAPI.getUsers(page, pageSize)

    dispatch(toggleIsFetching(false))
    dispatch(setTotalUsersCount(response.totalCount))
    dispatch(setUsers(response.items))
}

export const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    const response = await apiMethod(userId);

    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const followUser = (userId: number): AppThunk => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), follow)
}

export const unfollowUser = (userId: number): AppThunk => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollow)
}

export type UsersActionTypes = ReturnType<typeof follow>
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>
