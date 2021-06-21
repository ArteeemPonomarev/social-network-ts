import React from 'react';
import style from './Users.module.css'
import {UserType} from '../../redux/usersReducer';
import {NavLink} from 'react-router-dom';


type UsersPropsType = {
    follow: (id: number) => void
    unfollow: (id: number) => void
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

const Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return (
                        <span key={p}
                              style={{cursor: 'pointer'}}
                              onClick={() => props.setCurrentPage(p)}
                              className={props.currentPage === p ? style.selectedPage : ''}>
                    {p}
                </span>
                    )
                })
                }
            </div>
            {
                props.users.map(u => {
                    return (
                        <div key={u.id}>
                            <div>
                                <NavLink to={`/profile/${u.id}`}>
                                    <img className={style.img}
                                         src={u.photos.small || 'https://img.icons8.com/bubbles/2x/user-male.png'}
                                         alt="Dim"/>
                                </NavLink>
                            </div>
                            <div>
                                {
                                    u.followed
                                        ? <button
                                            disabled={props.followingInProgress.some(id => id === u.id)}
                                            onClick={() => {
                                                props.unfollowUser(u.id)
                                            }}>Unfollow</button>
                                        : <button
                                            disabled={props.followingInProgress.some(id => id === u.id)}
                                            onClick={() => {
                                                props.followUser(u.id)
                                            }}>Follow</button>
                                }

                            </div>
                            <div>
                                <div><span>name: {u.name}</span></div>
                                <div><span>status: {u.status && ''}</span></div>
                            </div>
                            <div>
                                <div><span>Minsk</span></div>
                                <div><span>Belarus</span></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default Users;
