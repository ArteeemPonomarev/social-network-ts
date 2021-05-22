import React, {ChangeEvent} from 'react';
import style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogsPageType} from '../../redux/dialogs-reducer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';


type DialogsPropsType = {
    dialogsPage: DialogsPageType
    addMessage: (newMessageBody: string) => void
    isAuth: boolean
};

type AddMessageFormDataType = {
    newMessageBody: string
}


const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    const messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} id={m.id} key={m.id}/>);

    const addMessage = (values: AddMessageFormDataType) => {
        props.addMessage(values.newMessageBody)
    };


    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <AddMessageFormRedux onSubmit={addMessage}/>
            </div>
        </div>
    )
};


const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={"textarea"} name={"newMessageBody"} placeholder={"Type your message..."}/>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<AddMessageFormDataType>({
    form: 'messageForm'
})(AddMessageForm)

export default Dialogs;