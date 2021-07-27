import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {ProfileType} from "../../../redux/profile-reducer";

export type ProfileFormDataType = {
    fullName: string
    lookingForAJob: string
    lookingForAJobDescription: string
    aboutMe: string
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileFormDataType>> = ({handleSubmit}) => {
    const profile = useSelector<AppStateType, ProfileType | null>(state => state.profilePage.profile)

    return (
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>
            <div>
                <b>Full Name</b>: {createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a jod</b>:
                {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>

            <div>
                <b>My professional skills</b>:
                {createField('My professional skills', "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me</b>:
                {createField('About me', 'aboutMe', [], Textarea)}
            </div>
            {/*/!*<div>*!/*/}
            {/*/!*    <b>Contact:</b> {Object.keys(profile.contacts).map(key => {*!/*/}
            {/*/!*    //@ts-ignore*!/*/}
            {/*/!*    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>*!/*/}
            {/*/!*})}*!/*/}
            {/*</div>*/}
        </form>
    )
}


export const ProfileDataReduxForm = reduxForm<ProfileFormDataType>({form: 'edit-profile'})(ProfileDataForm)