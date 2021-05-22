import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

type LoginFormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"input"} name={"login"} placeholder={"Login"}/>
            </div>
            <div>
                <Field component={"input"} name={"password"}  placeholder={"Password"}/>
            </div>
            <div>
                <Field component={"input"} name={"rememberMe"}  type="checkbox"/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType>({
    form: 'login'
})(LoginForm)

const Login = () => {
    const onSubmit = (formData: LoginFormDataType) => {
        console.log(formData)
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};



export default Login;
