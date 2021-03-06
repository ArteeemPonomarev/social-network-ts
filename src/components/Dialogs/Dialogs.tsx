import React from 'react';
import style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogsPageType} from '../../redux/state';

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    addDialogMessage: (DialogMessageText: string) => void
    onNewDialogMessageChange: (e: any) => void
}

const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    const messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} id={m.id}/>)

    const newMessageElement = React.createRef<HTMLTextAreaElement>();

    const addMessage = () => {
        const message = newMessageElement.current?.value;
        if (message) {
            props.addDialogMessage(message);
        }
    };

    const onDialogMessageChange = (e: any) => {
        props.onNewDialogMessageChange(e.currentTarget.value);
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <textarea onChange={onDialogMessageChange}
                          ref={newMessageElement}
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