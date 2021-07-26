import React from 'react';
import {UserType} from '../../redux/usersReducer';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';


type UsersPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: Array<number>
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
}

const Users: React.FC<UsersPropsType> = (props) => {

    return (
        <div>
            <Paginator currentPage={props.currentPage}
                       pageSize={props.pageSize}
                       setCurrentPage={props.setCurrentPage}
                       totalItemsCount={props.totalUsersCount}/>

            {props.users.map(u => <User key={u.id}
                                        followingInProgress={props.followingInProgress}
                                        followUser={props.followUser}
                                        unfollowUser={props.unfollowUser}
                                        user={u}/>)
            }
        </div>
    )
}


export default Users;
