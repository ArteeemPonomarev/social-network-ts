import {AppThunk, InferActionsTypes} from './redux-store';
import {ResultCodes, usersAPI} from '../api/api';
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
    pageSize: 10,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users ids
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

//Action creators

export const userActions = {
    follow: (id: number) => ({type: 'social-network/users/FOLLOW', id} as const),
    unfollow: (id: number) => ({type: 'social-network/users/UNFOLLOW', id} as const),
    setUsers: (users: Array<UserType>) => ({type: 'social-network/users/SET-USERS', users} as const),
    setCurrentPage: (currentPage: number) => {
        return {type: 'social-network/users/SET_CURRENT_PAGE', currentPage} as const
    },
    setTotalUsersCount: (totalCount: number) => {
        return {type: 'social-network/users/SET_TOTAL_USERS_COUNT', totalCount} as const
    },
    toggleIsFetching: (isFetching: boolean) => {
        return {type: 'social-network/users/TOGGLE_IS_FETCHING', isFetching} as const
    },
    toggleFollowingProgress: (isFetching: boolean, userId: number) => {
        return {type: 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS', userId, isFetching} as const
    },
}


//Thunk creators
export const requestUsers = (page: number, pageSize: number): AppThunk<Promise<void>> => async (dispatch) => {
    dispatch(userActions.toggleIsFetching(true));
    dispatch(userActions.setCurrentPage(page));

    try {
        const response = await usersAPI.getUsers(page, pageSize)

        dispatch(userActions.toggleIsFetching(false))
        dispatch(userActions.setTotalUsersCount(response.totalCount))
        dispatch(userActions.setUsers(response.items))
    } catch (error) {
        console.log(error)
    }
}

export const _followUnfollowFlow = async (dispatch: Dispatch,
                                          userId: number,
                                          apiMethod: any,
                                          actionCreator: (userID: number) => ReturnType<typeof userActions.follow>
                                              | ReturnType<typeof userActions.unfollow>
) => {
    dispatch(userActions.toggleFollowingProgress(true, userId));
    const response = await apiMethod(userId);

    if (response.resultCode === ResultCodes.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(userActions.toggleFollowingProgress(false, userId))
}

export const followUser = (userId: number): AppThunk<Promise<void>> => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), userActions.follow)
}

export const unfollowUser = (userId: number): AppThunk<Promise<void>> => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), userActions.unfollow)
}

//Action type
export type UsersActionTypes = InferActionsTypes<typeof userActions>
