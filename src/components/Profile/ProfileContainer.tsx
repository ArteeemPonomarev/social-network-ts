import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import {getUserProfile, ProfileType} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router"
import {withAuthRedirect} from '../../hoc/withAuthRedirect';


type MapStatePropsType = {
    profile: ProfileType | null
}

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

        return (
                <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
    }
}


export default connect(mapStateToProps,{getUserProfile})(withAuthRedirect(withRouter(ProfileContainer)));