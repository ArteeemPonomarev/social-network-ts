import React from 'react';
import style from './Users.module.css'
import {UserType} from '../../redux/usersReducer';
import {NavLink} from 'react-router-dom';
import userPhoto from '../../assets/images/userPhoto.png'


type UserPropsType = {
    user: UserType
    followingInProgress: Array<number>
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
}

export const User: React.FC<UserPropsType> = ({
                                                  user,
                                                  followingInProgress,
                                                  unfollowUser,
                                                  followUser}) => {

    return (
        <div>
            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img className={style.img}
                         src={user.photos.small || userPhoto}
                         alt="Dim"/>
                </NavLink>
            </div>
            <div>
                {
                    user.followed
                        ? <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollowUser(user.id)
                            }}>Unfollow</button>
                        : <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                followUser(user.id)
                            }}>Follow</button>
                }

            </div>
            <div>
                <div><span>name: {user.name}</span></div>
                <div><span>status: {user.status && ''}</span></div>
            </div>
            <div>
                <div><span>Minsk</span></div>
                <div><span>Belarus</span></div>
            </div>
        </div>


    )
}
