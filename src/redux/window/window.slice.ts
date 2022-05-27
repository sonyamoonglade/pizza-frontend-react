import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface WindowState {
    navigation: boolean
    cart: boolean
    userOrder: boolean
    loading: boolean
    loadingSuccess: boolean | null
    error: boolean
    navigationNotification: {
        cart: boolean
        orders: boolean
    }
}

const initialState:WindowState = {
    navigation: false,
    cart: false,
    userOrder: false,
    loading: false,
    loadingSuccess: false,
    error: false,
    navigationNotification: {
        cart: false,
        orders: false
    }
}


export const windowSlice = createSlice({
    initialState,
    name:'window',
    reducers:{

        toggleNavigation:(s) => {
            s.navigation = !s.navigation
        },

        toggleCart: (s) => {
            s.cart = !s.cart
        },
        toggleUserOrder: (s) => {
            s.userOrder = !s.userOrder
        },
        closeAll:(s) =>{
            s.cart = false
            s.navigation = false
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

        startCartNotification: (s) => {
            s.navigationNotification.cart = true
        },
        startOrdersNotification: (s) => {
            s.navigationNotification.orders = true
        },

        stopCartNotification: (s) => {
            s.navigationNotification.cart = false
        },
        stopOrdersNotification: (s) => {
            s.navigationNotification.orders = false
        }



    }

})
export const windowActions = windowSlice.actions
export default windowSlice.reducer