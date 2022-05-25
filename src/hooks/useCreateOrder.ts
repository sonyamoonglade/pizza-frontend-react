import {CreateUserOrder, DatabaseCartProduct, UserOrderFormFields} from "../common/types";
import {AxiosInstance} from "axios";
import {FormValuesInterface} from "../components/order/userOrder/Order";
import {useState} from "react";

const baseOrderUrl = 'http://localhost:5000/api/v1/order'
export function useCreateOrder (axios: AxiosInstance){



    async function createUserOrder(formValues: FormValuesInterface, cart: DatabaseCartProduct[]){

        let body = {
            ...formValues,
            cart
        }

        const response = await axios.post(`${baseOrderUrl}/createUserOrder`, body)
        return {order: response.data}



    }

    return {createUserOrder}

}