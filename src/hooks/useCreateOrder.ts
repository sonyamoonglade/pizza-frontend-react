import {CreateUserOrder, DatabaseCartProduct, UserOrderFormFields} from "../common/types";
import {AxiosInstance} from "axios";

const baseOrderUrl = 'http://localhost:5000/api/order'
export function useCreateOrder (axios: AxiosInstance){

    async function createUserOrder(formValues: CreateUserOrder, cart: DatabaseCartProduct[]){

        let body: CreateUserOrder


        if(formValues.is_delivered){
            body = {
                cart,
                is_delivered: formValues.is_delivered,
                delivery_details: {
                    address: formValues.delivery_details.address,
                    flat_call: Number(formValues.delivery_details.flat_call),
                    entrance_number: Number(formValues.delivery_details.entrance_number),
                    floor: Number(formValues.delivery_details.floor)
                }
            }
        }else{

            body = {
                is_delivered: formValues.is_delivered,
                cart
            }
        }

        const response = await axios.post(`${baseOrderUrl}/createUserOrder`, body)

        return response.data

    }

    return {createUserOrder}

}