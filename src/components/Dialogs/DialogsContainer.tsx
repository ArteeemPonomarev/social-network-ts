import React from 'react';
import { addMessageAC, onDialogMessageChangeAC,
} from '../../redux/dialogs-reducer';
import store from '../../redux/redux-store';
import Dialogs from './Dialogs';


const DialogsContainer = () => {

    let state = store.getState();

    const addMessage = () => {
        store.dispatch(addMessageAC());
    };

    const onDialogMessageChange = (text: string) => {
        store.dispatch(onDialogMessageChangeAC(text));
    };

    return (
        <Dialogs dialogsPage={state.dialogsPage}
                 addMessageContainer={addMessage}
                 onDialogContainerMessageChange={onDialogMessageChange}/>
    )
};

export default DialogsContainer;