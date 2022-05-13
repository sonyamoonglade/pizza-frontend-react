import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../../common/types";

interface ProductState {
    productList: Product[]
    isProductListLoading: boolean
    onLoadErrorMessage: string | null
    presentedProduct: Product | null
    isPresentingNow: boolean
}

const initialState:ProductState = {

    productList: [],
    isProductListLoading: false,
    presentedProduct: null,
    onLoadErrorMessage: null,
    isPresentingNow: false
}


export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{

        listLoading:(s) => {
            s.isProductListLoading = true
        },

        saveList:(s,a:PayloadAction<Product[]>) => {

            s.productList = a.payload
            // s.isProductListLoading = false
        },

        setErrorMessage:(s,a:PayloadAction<string>) => {
            console.log(a)
            s.onLoadErrorMessage = a.payload
        },

        startPresentation:(s,a:PayloadAction<Product>) => {
            s.isPresentingNow = true
            s.presentedProduct = a.payload
        },
        stopPresentation:(s) => {
            s.isPresentingNow = false
        }





    }
})

export default productSlice.reducer
