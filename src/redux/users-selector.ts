import {AppStateType} from './redux-store';
import {UserType} from './usersReducer';

export const getUsersS = (state: AppStateType): Array<UserType> => {
    return state.usersPage.users
}

export const getPageSizeS = (state: AppStateType): number => {
    return state.usersPage.pageSize
}

export const getTotalUsersCountS = (state: AppStateType): number => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPageS = (state: AppStateType): number => {
    return state.usersPage.currentPage
}

export const getIsFetchingS = (state: AppStateType): boolean => {
    return state.usersPage.isFetching
}

export const getFollowingInProgressS = (state: AppStateType): Array<number> => {
    return state.usersPage.followingInProgress
}