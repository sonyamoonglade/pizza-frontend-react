import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Order from "../../components/order/userOrder/Order";
import {ResponseUserOrder} from "../../common/types";




interface InitialOrderStateInterface {
    orderHistory: ResponseUserOrder[]
    hasMore: boolean

}


const initialState: InitialOrderStateInterface = {
    orderHistory: [],
    hasMore: true
}


export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        //todo: add infinite scroll from async action.. smth like that
        addOne: (s,a:PayloadAction<ResponseUserOrder>) => {
            const o = a.payload
            s.orderHistory = s.orderHistory.concat(o)
        },

        addManyAndSetHasMore: (s, a:PayloadAction<{orders: ResponseUserOrder[], hasMore: boolean}>) => {
            const {orders,hasMore} = a.payload
            s.orderHistory = s.orderHistory.concat(...orders)
            s.hasMore = hasMore
        }
    }
})


export default orderSlice.reducer
export const orderActions = orderSlice.actions