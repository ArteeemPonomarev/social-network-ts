import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {logout} from '../../redux/auth-reducer';

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchToPropsType = {
    logout: () => void
}
type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    render() {
        return (
            <>
                <Header {...this.props}/>
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});


export default connect(mapStateToProps, { logout})(HeaderContainer);
