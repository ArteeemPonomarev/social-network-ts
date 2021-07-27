import React, {useEffect} from 'react';
import { ChangeEvent } from 'react';
import {useState} from 'react';


type ProfileStatusPropsType = {
    status: string | null
    updateUserStatus: (status: string) => void
}

export const ProfileStatusWithHooks: React.FC<ProfileStatusPropsType> = (props) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string | null>(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateMode = () => {
        setEditMode(true)
    }

    const deActivateMode = () => {
        setEditMode(false)
        if (status !== null) {
            props.updateUserStatus(status)
        }
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode &&
            <div>
                <b>Status</b>: <span onDoubleClick={activateMode}>{props.status || 'Type your status...'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange}
                       onBlur={deActivateMode}
                       autoFocus
                       value={status === null ? '' : status}/>
            </div>
            }
        </div>
    );

}


