import React from 'react';
import {UsersPropsType} from './UsersContainer';
import style from './Users.module.css'
import axios from 'axios';
import {UserType} from '../../redux/usersReducer';


const Users = (props: UsersPropsType) => {


    const getUsers = () => {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => props.setUsers(response.data.items))
        }
    }

    return (
        <div>
            <button onClick={getUsers}>get Users</button>
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
    );
};

export default Users;

// [
//     {
//         id: 1,
//         photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/411px-Dmitry_Nagiev_2017_4.jpg',
//         followed: false,
//         fullName: 'Dmitry',
//         status: 'I am a boss',
//         location: {city: 'Minsk', country: 'Belarus'}
//     },
//     {
//         id: 2,
//         photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/411px-Dmitry_Nagiev_2017_4.jpg',
//         followed: false,
//         fullName: 'Artem',
//         status: 'I am not a boss ',
//         location: {city: 'Minsk', country: 'Belarus'}
//     },
//     {
//         id: 3,
//         photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/411px-Dmitry_Nagiev_2017_4.jpg',
//         followed: false,
//         fullName: 'Nikita',
//         status: 'I am a boss too',
//         location: {city: 'Minsk', country: 'Belarus'}
//     },
// ]