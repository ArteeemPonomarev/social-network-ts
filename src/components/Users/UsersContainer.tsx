import React from 'react';
import Users from './Users';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    follow,
    setCurrentPage,
    unfollow,
    UserType,
    toggleFollowingProgress, getUsers, followUser, unfollowUser
} from '../../redux/usersReducer';
import Preloader from '../common/Pleloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


export type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
};
export type MapDispatchPropsType = {
    follow: (id: number) => void
    unfollow: (id: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
};
export type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainerComponent extends React.Component<UsersContainerPropsType> {

    componentDidMount(): void {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onSetCurrentPageHandler(pageNumber: number) {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {

        return (
            <>
                {
                    this.props.isFetching
                        ? <Preloader/>
                        : null}
                <Users
                    users={this.props.users}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    setCurrentPage={this.onSetCurrentPageHandler.bind(this)}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    followingInProgress={this.props.followingInProgress}
                    followUser={this.props.followUser}
                    unfollowUser={this.props.unfollowUser}/>

            </>
        )
    }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    };
};


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,
        getUsers,
        followUser,
        unfollowUser
    }),
    withAuthRedirect
)(UsersContainerComponent);