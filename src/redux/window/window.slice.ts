import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {inflate} from "zlib";


interface WindowState {
    menu: boolean
    cart: boolean
    userOrder: boolean
}

const initialState:WindowState = {
    menu: false,
    cart: false,
    userOrder: false
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
        }

    }

})
export const windowActions = windowSlice.actions
export default windowSlice.reducer