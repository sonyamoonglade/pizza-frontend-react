import {useCallback, useState} from "react";
import {AxiosInstance} from "axios";
import {useAppDispatch, userActions} from "../redux";

const baseAuthUrl = "http://localhost:5000/api/v1/users"

export function useAuthentication (axios:AxiosInstance) {
    
    const dispatch = useAppDispatch()

    const login = useCallback(async (phone_number: string) => {
        const body = {
            phone_number
        }
        await axios.post(`${baseAuthUrl}/login`, body)
        dispatch(userActions.login())
        
    },[])
    
    
    return {login}
    
}