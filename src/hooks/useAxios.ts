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
        return Promise.reject(error)

    }
    function responseSuccessHandler(s: any){
        return s
    }

    const client = axios.create({
        baseURL:"https://zharpizza-backend.herokuapp.com/api/v1",
        withCredentials: true
    })
    client.interceptors.response.use(
       success => responseSuccessHandler(success),
        error => responseErrorHandler(error)
    )

    return {client}
}