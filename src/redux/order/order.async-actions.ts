import {AppDispatch} from "../store";
import {AxiosInstance} from "axios";
import {ResponseUserOrder} from "../../common/types";
import {orderActions} from "./order.slice";

type userOrderHistoryResponse = {
    hasMore: boolean
    orders: ResponseUserOrder[]
}

export const getOrderHistory = (client: AxiosInstance, to: number) => async (dispatch: AppDispatch) => {


    try{

        const {data} = await client.get<userOrderHistoryResponse>(`/order/userOrderHistory?to=${to}`)
        dispatch(orderActions.addManyAndSetHasMore(data))

    }catch (e: any) {
        return Promise.reject(e.message)
    }

}