import React from 'react';
import {UsersContainerPropsType} from './UsersContainer';
import style from './Users.module.css'
import {UserType} from '../../redux/usersReducer';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

type UsersPropsType = {
    follow: (id: number) => void
    unfollow: (id: number) => void
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void

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
                                        ? <button onClick={() => {
                                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                                withCredentials: true,
                                                headers: {
                                                    'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'
                                                }
                                            })
                                                .then(response => {
                                                    if (response.data.resultCode === 0) {
                                                        props.unfollow(u.id)
                                                    }
                                                })
                                        }}>Unfollow</button>
                                            : <button onClick={() => {
                                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                                    {},
                                                    {
                                                        withCredentials: true,
                                                        headers: {
                                                            'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'
                                                        }
                                                    })
                                                    .then(response => {
                                                        if (response.data.resultCode === 0) {
                                                            props.follow(u.id)
                                                        }
                                                    })
                                            }}>Follow</button>}

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
