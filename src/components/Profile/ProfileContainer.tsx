import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {getUserProfile, getUserStatus, ProfileType, updateUserStatus} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router'
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


type MapStatePropsType = {
    profile: ProfileType | null
    status: string | null
    isAuth: boolean
    authorizedUserId: number | null
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void;
    getUserStatus: (userId: number) => void;
    updateUserStatus: (status: string) => void;
}
type PathParamsType = {
    userId: string
}

export type ProfileContainerPropsType = MapStatePropsType
    & MapDispatchPropsType
    & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = +this.props.match.params.userId;

        if (!userId) {
            userId = Number(this.props.authorizedUserId);

            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }


    render() {

        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}/>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withAuthRedirect,
    withRouter
)(ProfileContainer);