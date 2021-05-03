import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import {getUserProfile, ProfileType} from '../../redux/profile-reducer';
import {Redirect, withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router"


type MapStatePropsType = {
    profile: ProfileType | null
    isAuth: boolean
};

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void;
}
type PathParamsType = {
    userId: string
}

export type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = 8265;
        }
        this.props.getUserProfile(userId)
    }


    render() {
        if (!this.props.isAuth) {
            return <Redirect to={'/login'}/>
        }
        return (
                <Profile {...this.props} profile={this.props.profile}/>
        )
    }
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)



export default connect(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent);