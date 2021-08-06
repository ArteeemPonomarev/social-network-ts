import { createSelector } from 'reselect';
import {AppStateType} from './redux-store';
import {UserType} from './usersReducer';

const getUsersSelector = (state: AppStateType): Array<UserType> => state.usersPage.users;

//getUsers is an example of "createSelector" work
export const getUsers = createSelector([getUsersSelector], (users) => users.filter(u => true));

export const getPageSize = (state: AppStateType): number => state.usersPage.pageSize;
export const getTotalUsersCount = (state: AppStateType): number => state.usersPage.totalUsersCount;
export const getCurrentPage = (state: AppStateType): number => state.usersPage.currentPage;
export const getIsFetching = (state: AppStateType): boolean => state.usersPage.isFetching;
export const getFollowingInProgress = (state: AppStateType): Array<number> => state.usersPage.followingInProgress;