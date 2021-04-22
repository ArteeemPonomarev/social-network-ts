import React from 'react';
import {UsersContainerPropsType} from './UsersContainer';
import style from './Users.module.css'
import axios from 'axios';
import Users from './Users';


class UsersContainerComponent extends React.Component<UsersContainerPropsType> {

    componentDidMount(): void {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setTotalUsersCount(response.data.totalCount)
                this.props.setUsers(response.data.items)

            })
    }


    onSetCurrentPageHandler(pageNumber: number) {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => this.props.setUsers(response.data.items))

    }

    render() {

        return (
            <Users
                users={this.props.users}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                setCurrentPage={this.onSetCurrentPageHandler}/>
        )
    }
}


export default UsersContainerComponent;
