import React from 'react';
import {dialogsActions, InitialDialogsStateType} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {compose} from 'redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

type MapStatePropsType = {
    dialogsPage: InitialDialogsStateType
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        addMessage: dialogsActions.addMessage
    }),
    withAuthRedirect
)(Dialogs);

