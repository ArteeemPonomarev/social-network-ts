import React from 'react';
import style from '../../Dialogs/Dialogs.module.css';

type MessagePropsType = {
    message: string
    id: number
}

export const Message = (props:MessagePropsType) => {
    return (
        <div className={style.message}>{props.message}</div>
    )
}