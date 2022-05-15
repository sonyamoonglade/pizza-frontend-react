import {createSlice} from "@reduxjs/toolkit";


interface UserState {
    isAuthenticated: boolean

}

const initialState:UserState = {
    isAuthenticated: false
}


export const userSlice = createSlice({
    initialState,
    name:'user',
    reducers:{

        login:(s) => {
            s.isAuthenticated = true
        },

        logout:(s) => {
            s.isAuthenticated = false
        }

    }

})
export const userActions = userSlice.actions
export default userSlice.reducer