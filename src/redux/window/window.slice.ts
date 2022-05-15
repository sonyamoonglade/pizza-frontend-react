import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface WindowState {
    menu: boolean
    cart: boolean
    cartLink: boolean
}

const initialState:WindowState = {
    menu: false,
    cart: false,
    cartLink: false
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

        toggleCartLink: (s, a:Required<PayloadAction<boolean>>) =>{
            s.cartLink = a.payload
        }

    }

})
export const windowActions = windowSlice.actions
export default windowSlice.reducer