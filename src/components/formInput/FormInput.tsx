import React, {FC, HTMLInputTypeAttribute, useState} from 'react';

import './form-input.styles.scss'

interface formInputProps {
    name: string
    type: HTMLInputTypeAttribute
    placeholder: string
    v: any
    setV: Function
    // onChangeFunc
    labelText: string
}

const FormInput:FC<formInputProps> = (props) => {


    const [isEmptyField, setIsEmptyField] = useState<boolean>(true)

    const {
        type,
        name,
        placeholder,
        v,
        setV,
        labelText
    } = props

    return (
        <div className='form_input_container'>
            {!isEmptyField &&
                <label htmlFor={name}>
                    {labelText}
                </label>
            }
            <input
                id={name}
                placeholder={placeholder}
                type={type}
                name={name}
                value={v}
                onChange={(e) => setV((state: any) =>{
                    return {...state, [e.target.name]: e.target.value}
                })}
                className='form_input'
            />
        </div>
    );
};

export default FormInput;