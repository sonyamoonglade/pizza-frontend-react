import {AppDispatch} from "../store";
import {productSlice} from "./product.slice";
import axios, {AxiosInstance} from "axios";
import {Product} from "../../common/types";


const productActions = productSlice.actions

export const getCatalogProducts = (client:AxiosInstance) => async (dispatch:AppDispatch) => {

    try {
        // dispatch(productActions.listLoading())
        const {data} = await client.get<Product[]>('/product/catalogProducts')

        dispatch(productActions.saveList(data))

    }catch (e: any) {
        dispatch(productActions.setErrorMessage(e.message))
    }
}