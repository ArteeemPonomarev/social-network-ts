import React from 'react';
import style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../common/FormsControls/FormsControls';
import {maxLength, required} from '../../utils/validators/validators';
import {InitialDialogsStateType} from "../../redux/dialogs-reducer";


type DialogsPropsType = {
    dialogsPage: InitialDialogsStateType
    addMessage: (newMessageBody: string) => void
    isAuth: boolean
};

type AddMessageFormDataType = {
    newMessageBody: string
}

const maxLength50 = maxLength(50)

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name={"newMessageBody"}
                validate={[required, maxLength50]}
                placeholder={"Type your message..."}/>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<AddMessageFormDataType>({
    form: 'messageForm'
})(AddMessageForm)


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


export default Dialogs;