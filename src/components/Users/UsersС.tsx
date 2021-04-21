import React from 'react';
import {MapDispatchPropsType, MapStatePropsType, UsersPropsType} from './UsersContainer';
import style from './Users.module.css'
import axios from 'axios';
import {UserType} from '../../redux/usersReducer';
//import style from './Users.module.css';

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersC extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    constructor(props: PropsType) {
        super(props)
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => this.props.setUsers(response.data.items))
        }

    render() {
      return(
          <div>

              {
                  this.props.users.map(u => {
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
                                          ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button>
                                          : <button onClick={() => this.props.follow(u.id)}>Follow</button>
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
}



export default UsersC;
