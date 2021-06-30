import React from 'react';
import styles from './FormsControls.module.css'
import {Field} from 'redux-form';

export const FormControl: React.FC<any> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <div>
                {props.children}
            </div>
            {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea: React.FC<any> = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>
    )
}

export const Input: React.FC<any> = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...props.input} {...restProps}/>
        </FormControl>
    )
}

export const createField = (placeholder: string | null,
                            name: string,
                            validators: Array<any>,
                            component: any,
                            props?:{type: string},
                            text?: string) => {
    return (
        <div>
            <Field
                component={component}
                name={name}
                validate={validators}
                placeholder={placeholder}
                {...props}
            /> {text}
        </div>
    )
}