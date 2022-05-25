import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {inflate} from "zlib";


interface WindowState {
    menu: boolean
    cart: boolean
    userOrder: boolean
    loading: boolean
    loadingSuccess: boolean | null
    error: boolean
}

const initialState:WindowState = {
    menu: false,
    cart: false,
    userOrder: false,
    loading: false,
    loadingSuccess: false,
    error: false
}


export const windowSlice = createSlice({
    initialState,
    name:'window',
    reducers:{

        toggleMenu:(s) => {
            s.menu = !s.menu
        },

        toggleCart: (s) => {
            s.cart = !s.cart
        },


        toggleUserOrder: (s) => {
            s.userOrder = !s.userOrder
        },

        closeAll:(s) =>{
            s.cart = false
            s.menu = false
            s.userOrder = false
        },

        toggleLoading: (s,a:PayloadAction<boolean>) => {
            s.loading = a.payload
        },

        loadingSuccess: (s) => {
          s.loadingSuccess = true
        },

        startErrorScreen: (s) => {
            s.loading = false
            s.loadingSuccess = false
            s.error = true
        },
        stopErrorScreen: (s) => {
            s.loadingSuccess = null
            s.error = false
        },



    }

})
export const windowActions = windowSlice.actions
export default windowSlice.reducer