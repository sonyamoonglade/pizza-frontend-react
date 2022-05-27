import {AppDispatch} from "../store";
import {AxiosInstance} from "axios";
import {useAppSelector} from "../hooks/AppSelector";
import {userSelector} from "../user/user.selector";
import {ResponseUserOrder} from "../../common/types";
import {orderActions} from "./order.slice";

type userOrderHistoryResponse = {
    hasMore: boolean
    orders: ResponseUserOrder[]
}

export const getOrderHistory = (client: AxiosInstance, to: number) => async (dispatch: AppDispatch) => {
    const baseUrl = "http://localhost:5000/api/v1/order"



    try{

        const {data} = await client.get<userOrderHistoryResponse>(`${baseUrl}/userOrderHistory?to=${to}`)
        dispatch(orderActions.addManyAndSetHasMore(data))

    }catch (e: any) {
        return Promise.reject(e.message)
    }

}