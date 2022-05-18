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
}

const FormInput:FC<formInputProps> = (props) => {


    const [isValid, setIsValid] = useState<boolean>(null)
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [inputTagClasses,setInputTagClasses] = useState<string[]>([])

    const validationAnimationRef = useRef<HTMLInputElement>(null)

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
        Regexp
    } = props



    useEffect(() => {

       if(!isFocused){
           const alreadyHas = inputTagClasses.some(e => e === "--pristine")

           if(!alreadyHas){
               setInputTagClasses((p) => p.concat("--pristine"))
           }
       }
       else if(!isValid && isFocused){
           console.log('s')
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

            <input
                ref={validationAnimationRef}
                onBlur={() => {

                    if(v.trim().length === 1 || v.trim().length === 0){
                        setV((state: any) => {
                            return {...state, [name]:onBlurValue}
                        })
                        setIsFocused(false)
                    }
                    return
                }}
                onFocus={() => {
                    if(v.trim().length > 1) {
                        setIsFocused(true)
                        return
                    }
                    setV((state: any) => {
                        return {...state, [name]:onBlurValue}
                    })
                    setIsFocused(true)
                }}
                id={name}
                placeholder={placeholder}
                type={type}
                maxLength={maxLength || 100}
                name={name}
                value={isFocused ? v : placeholder}
                onChange={(e) => {
                    const inputValue = e.target.value
                    if(fieldValidationFn !== undefined) {
                        const validationResult = fieldValidationFn(inputValue)
                        setIsValid(validationResult)
                    }

                    // if(Regexp && inputValue.match(Regexp)) return
                    setV((state: any) =>{
                        return {...state, [e.target.name]: e.target.value}
                    })

                }}
                className={`form_input ${extraClassName || ""} ${inputTagClasses.join(' ')}`}
            />

    );
};

export default React.memo(FormInput);