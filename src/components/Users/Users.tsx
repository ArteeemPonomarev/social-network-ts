import React from 'react';
import {UserType} from '../../redux/usersReducer';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';
import {Pagination} from "antd";
import Preloader from "../common/Pleloader/Preloader";


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
    isFetching: boolean
}

const Users: React.FC<UsersPropsType> = (props) => {
    function itemRender(current: any, type: any, originalElement: any) {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    }

    return (
        <div>
            <Pagination total={props.totalUsersCount}
                        current={props.currentPage}
                        onChange={props.setCurrentPage} itemRender={itemRender}/>
            {
                props.isFetching
                    ? <Preloader/>
                    : null}

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
