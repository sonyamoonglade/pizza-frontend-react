import axios from 'axios'
import {userSlice} from "../redux/user/user.slice";
import {useAppDispatch} from "../redux/hooks/AppDispatch";



export function useAxios (){

    const userActions = userSlice.actions

    const dispatch = useAppDispatch()

    function responseErrorHandler(error: any){
        const statusCode = error.response.status
        if(statusCode === 401) {
            dispatch(userActions.logout())
        } // unauthorized
        Promise.reject(error)
    }
    function responseSuccessHandler(s: any){
        return s
    }

    const client = axios.create({
        baseURL:"http://localhost:5000/api/v1",
    })
    client.interceptors.response.use(
       success => responseSuccessHandler(success),
        error => responseErrorHandler(error)
    )

    return {client}
}