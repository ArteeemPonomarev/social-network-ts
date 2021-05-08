import React, {ChangeEvent} from 'react';
import style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogsPageType} from '../../redux/dialogs-reducer';
import {Redirect} from 'react-router-dom'


type DialogsPropsType = {
    dialogsPage: DialogsPageType
    addMessage: () => void
    onDialogMessageChange: (text: string) => void
    isAuth: boolean
};


const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    const messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} id={m.id} key={m.id}/>);

    const addMessage = () => {
        props.addMessage();
    };

    const onDialogMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onDialogMessageChange(e.currentTarget.value);
    };
    

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
};

export default Dialogs;