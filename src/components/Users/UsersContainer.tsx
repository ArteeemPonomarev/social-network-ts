import React from 'react';
import Users from './Users';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {followAC, setUsersAc, unfollowAC, UserType} from '../../redux/usersReducer';
import UsersC from './UsersС';

export type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
};

export type MapDispatchPropsType = {
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers: (users: Array<UserType>) => void
};
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType;

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    };
};


let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        follow: (id: number) => {
            dispatch(followAC(id));
        },
        unfollow: (id: number) => {
            dispatch(unfollowAC(id));
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAc(users));
        }
    };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC);

export default UsersContainer;