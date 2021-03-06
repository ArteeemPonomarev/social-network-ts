import React from 'react';
import style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogContentType, MessageContentType} from '../../redux/state';

type DialogsPropsType = {
    dialogs: Array<DialogContentType>
    messages: Array<MessageContentType>
    addPost: (postText: string) => void
}

const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map(m => <Message message={m.message} id={m.id}/>)

    let newMessageElement = React.createRef<HTMLTextAreaElement>();

    let addMessage = () => {
        let message = newMessageElement.current?.value;
        if (message) {
            props.addPost(message);
        }
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <textarea ref={newMessageElement}></textarea>
                <div>
                    <button onClick={addMessage}>Add Message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;