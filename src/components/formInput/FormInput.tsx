import React, {FC, HTMLInputTypeAttribute, useEffect, useRef, useState} from 'react';

import './form-input.styles.scss'
import {log} from "util";

interface formInputProps {
    name: string
    type: HTMLInputTypeAttribute
    placeholder: string
    v: any
    setV: Function
    fieldValidationFn?: Function
    onBlurValue: string
    maxLength?: number
    extraClassName?: string
    Regexp?: RegExp
    minLength: number
}

const FormInput:FC<formInputProps> = (props) => {


    const [isValid, setIsValid] = useState<boolean>(null)
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [inputTagClasses,setInputTagClasses] = useState<string[]>([])

    const inputRef = useRef<HTMLInputElement>(null)

    const {
        type,
        name,
        placeholder,
        v,
        setV,
        fieldValidationFn,
        onBlurValue,
        maxLength,
        extraClassName,
        Regexp,
        minLength
    } = props



    useEffect(() => {

       if(!isFocused){
           const alreadyHas = inputTagClasses.some(e => e === "--pristine")

           if(!alreadyHas){
               setInputTagClasses((p) => p.concat("--pristine"))
           }
       }
       else if(!isValid && isFocused){
           setInputTagClasses((p) => ["--invalid"].filter(e => e !== "--pristine"))
       }
       else if(!isValid && isValid !== null){
           const alreadyHas = (inputTagClasses.some(e => e === "--invalid"))
           if(!alreadyHas){
               setInputTagClasses((p) => p.concat("--invalid").filter(p => p !== "--valid"))
           }
       }
       else {
           setInputTagClasses((p) => ["--valid"])
       }
       return
    },[isValid,isFocused])



    return (

            <div className={`${extraClassName || ""} form_input_container ${inputTagClasses.join(' ')}`}>

                <label htmlFor={name} className='form_input_label'>
                    {onBlurValue}
                </label>

                <input
                    ref={inputRef}

                    onBlur={(e) => {

                        if(v.trim().length < minLength || v.trim().length === 0){

                            setIsFocused(false)
                            setV((state: any) => {
                                return {...state,[e.target.name]:""}
                            })
                        }
                        return
                    }}
                    onFocus={() => {
                        if(v.trim().length > minLength) {
                            setIsFocused(true)
                            return
                        }

                        setIsFocused(true)
                    }}
                    id={name}
                    placeholder={placeholder}
                    type={type}
                    maxLength={maxLength || 100}
                    name={name}
                    value={v}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        if(fieldValidationFn !== undefined) {
                            const validationResult = fieldValidationFn(inputValue, minLength)
                            setIsValid(validationResult)
                        }
                        if(Regexp && inputValue.match(Regexp)) return
                        setV((state: any) =>{
                            return {...state, [e.target.name]: e.target.value}
                        })

                    }}
                    className={`form_input`}
                />
            </div>

    );
};

export default React.memo(FormInput);