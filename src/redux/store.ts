import {configureStore} from "@reduxjs/toolkit";
import productReducer from './product/product.slice'
import userReducer from './user/user.slice'
import windowReducer from './window/window.slice'
export const store = configureStore({
    reducer:{
        productReducer,
        userReducer,
        windowReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch