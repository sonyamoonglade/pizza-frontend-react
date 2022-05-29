import {CreateUserOrder, DatabaseCartProduct, UserOrderFormFields} from "../common/types";
import {AxiosInstance} from "axios";
import {FormValuesInterface} from "../components/order/userOrder/Order";
import {useCallback, useState} from "react";

export function useCreateOrder (client: AxiosInstance){



    const createUserOrder = useCallback(async function (formValues: FormValuesInterface, cart: DatabaseCartProduct[]){

        let body = {
            ...formValues,
            cart
        }

        const response = await client.post(`order/createUserOrder`, body)
        return {order: response.data}



    },[])

    return {createUserOrder}

}