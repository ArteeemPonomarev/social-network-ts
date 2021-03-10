import React, {ChangeEvent} from 'react';
import style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {ActionsTypes, DialogsPageType} from '../../redux/state';

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    // addDialogMessage: () => void
    // onNewDialogMessageChange: (newText: string) => void
    dispatch: (action: ActionsTypes) => void
}

const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    const messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} id={m.id}/>)

    const addMessage = () => {
        props.dispatch({type: 'ADD-DIALOG-MESSAGE'});
    };

    const onDialogMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch({type: 'UPDATE-NEW-DIALOG-VALUE', newValue: e.currentTarget.value});
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <textarea onChange={onDialogMessageChange}
                          value={props.dialogsPage.newDialogMessageText}>
                    Enter message
                </textarea>
                <div>
                    <button onClick={addMessage}>Add Message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;