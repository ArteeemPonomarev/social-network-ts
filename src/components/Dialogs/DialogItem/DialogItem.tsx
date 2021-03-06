import React from 'react';
import style from '../../Dialogs/Dialogs.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemPropsType = {
    name: string
    id: number
}

export const DialogItem= (props:DialogItemPropsType) => {
    return (
        <div className={style.dialog}>
            <NavLink to={'/dialogs/1' + props.id}  activeClassName={style.active}>
                {props.name}
            </NavLink>
        </div>
    )
}

