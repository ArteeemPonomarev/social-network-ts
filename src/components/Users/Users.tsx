import React from 'react';
import {UsersContainerPropsType} from './UsersContainer';
import style from './Users.module.css'
import {UserType} from '../../redux/usersReducer';

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
                        <span
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
                                <img className={style.img}
                                     src={u.photos.small || 'https://upload.wikimedia.org/wikipedia/commons/8/88/Dmitry_Nagiev_2017_4.jpg'}
                                     alt="Dim"/>
                            </div>
                            <div>
                                {
                                    u.followed
                                        ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
                                        : <button onClick={() => props.follow(u.id)}>Follow</button>
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
