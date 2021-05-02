import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import {ProfileType, setUserProfile} from '../../redux/profile-reducer';
import { withRouter } from "react-router-dom";
import {RouteComponentProps} from "react-router"


type MapStatePropsType = {
    profile: ProfileType | null
};

type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileType) => void
};

type PathParamsType = {
    userId: string
}

export type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = '8265';
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
               this.props.setUserProfile(response.data);
            })
    }

    render() {
        return (
                <Profile {...this.props} profile={this.props.profile}/>
        )
    }
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)



export default connect(mapStateToProps,{setUserProfile})(WithUrlDataContainerComponent);