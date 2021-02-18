import React from 'react';
import style from './Dialogs.module.css';

const Dialogs = () => {
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                <div className={style.dialog + ' ' + style.active}>
                    Artem
                </div>
                <div className={style.dialog }>
                    Valera
                </div>
                <div className={style.dialog}>
                    Nikita
                </div>
                <div className={style.dialog}>
                    Sasha
                </div>
                <div className={style.dialog}>
                    Lesha
                </div>
            </div>
            <div className={style.messages}>
                <div className={style.message}>Hi</div>
                <div className={style.message}>How are your studies?</div>
                <div className={style.message}>Yeeeah</div>
            </div>
        </div>
    )
}

export default Dialogs;