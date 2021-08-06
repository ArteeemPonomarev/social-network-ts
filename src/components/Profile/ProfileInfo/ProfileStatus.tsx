import React, {ChangeEvent} from 'react';


type ProfileStatusPropsType = {
    status: string | null
    updateUserStatus: (status: string) => void
}

type StateType = {
    editMode: boolean
    status: string | null
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () =>   {
        this.setState({editMode: true})
    }

    deactivateEditMode = () =>  {
        this.setState({editMode: false})
        if (this.state.status !== null) {
            this.props.updateUserStatus(this.state.status)
        }
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>): void {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span  onDoubleClick={this.activateEditMode}>{this.props.status || 'Type your status...'}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditMode} value={this.state.status === null ? '' : this.state.status}/>
                </div>
                }
            </div>
        );
    }
}


