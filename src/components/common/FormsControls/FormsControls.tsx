import React from 'react';
import styles from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form';
import {FieldValidatorType} from "../../../utils/validators/validators";


type FormsControlPropsType = {
    meta: WrappedFieldMetaProps
}

export const FormControl:React.FC<FormsControlPropsType>= ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <div>
                {children}
            </div>
            {touched && error && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
   // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...props.input} {...restProps}/>
        </FormControl>
    )
}

export function createField<FormKeysType extends string> (placeholder: string | undefined,
                            name: FormKeysType,
                            validators: Array<FieldValidatorType>,
                            component: any,
                            props?:{type: string},
                            text?: string) {
    return (
        <div>
            <Field
                style={{marginTop: '20px'}}
                component={component}
                name={name}
                validate={validators}
                placeholder={placeholder}
                {...props}
            /> {text}
        </div>
    )
}