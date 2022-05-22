import {useCallback} from "react";
import {AxiosInstance} from "axios";
import {useAppDispatch, userActions} from "../redux";

const baseAuthUrl = "http://localhost:5000/api/users"

export function useAuthentication (axios:AxiosInstance) {
    
    const dispatch = useAppDispatch()
    
    
    const login = useCallback(async (phone_number: string) => {
        const body = {
            phone_number
        }
        try {
            await axios.post(`${baseAuthUrl}/login`, body)
            dispatch(userActions.login())
        }catch (e) {
            return e
        }
        
        
        
        
    },[])
    
    
    return {login}
    
}