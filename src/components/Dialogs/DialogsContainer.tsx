import React from 'react';
import {
    addMessageAC, onDialogMessageChangeAC,
} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import StoreContext from '../../StoreContext';


const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {
            (store) => {
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
            }
        }
        </StoreContext.Consumer>
    )
};

export default DialogsContainer;