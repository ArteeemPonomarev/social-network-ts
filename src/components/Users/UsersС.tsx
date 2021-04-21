import React from 'react';
import {UsersPropsType} from './UsersContainer';
import style from './Users.module.css'
import axios from 'axios';


class UsersC extends React.Component<UsersPropsType> {

    componentDidMount(): void {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => this.props.setUsers(response.data.items))
    }


    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

      return(
          <div>
            <div>
                {pages.map(p => <span className={this.props.currentPage === p ? style.selectedPage : '' }>{p}</span>)}
            </div>
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
