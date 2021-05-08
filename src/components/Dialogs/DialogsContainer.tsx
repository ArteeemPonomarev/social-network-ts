import React from 'react';
import {
    addMessageAC, DialogsPageType, onDialogMessageChangeAC,
} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {compose, Dispatch} from 'redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

type MapStatePropsType = {
    dialogsPage: DialogsPageType
    isAuth: boolean
}

type MapDispatchPropsType = {
    addMessage: () => void
    onDialogMessageChange: (text: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addMessage: () => {
            dispatch(addMessageAC())
        },
        onDialogMessageChange: (text: string) => {
            dispatch(onDialogMessageChangeAC(text))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);

