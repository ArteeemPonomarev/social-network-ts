import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import styles from './../common/FormsControls/FormsControls.module.css'


const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = (props) => {

    const {handleSubmit, error, captchaUrl} = props;

    return (
        <>
            <p>To log in get registered
                <a href={'https://social-network.samuraijs.com/'}
                   target={'_blank'}> here
                </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
            <form onSubmit={handleSubmit}>
                {createField<LoginFormDataTypeKeys>('Email', 'email', [required], Input)}
                {createField<LoginFormDataTypeKeys>('password', 'password', [required], Input, {type: 'password'})}
                {createField<LoginFormDataTypeKeys>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

                {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
                {captchaUrl && createField<LoginFormDataTypeKeys>('Captcha symbols', 'captcha', [required], Input)}

                {error && <div className={styles.formSummaryError}>{error}</div>}

                <div>
                    <button>Login</button>
                </div>
            </form>
        </>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnPropsType>({form: 'login'})(LoginForm);


const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({login, isAuth, captchaUrl}) => {
    const onSubmit = (formData: LoginFormDataType) => {
        const {email, password, rememberMe, captcha} = formData;
        login(email, password, rememberMe, captcha);
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {login})(Login);

//types
type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormDataTypeKeys = Extract<keyof LoginFormDataType, string>;

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}