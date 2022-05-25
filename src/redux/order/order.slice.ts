import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Order from "../../components/order/userOrder/Order";
import {UserOrderInterface} from "../../common/types";




interface InitialOrderStateInterface {
    orderHistory: UserOrderInterface[]

}


const initialState: InitialOrderStateInterface = {
    orderHistory: []
}


export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        //todo: add infinite scroll from async action.. smth like that
        addOne: (s,a:PayloadAction<UserOrderInterface>) => {
            const o = a.payload
            s.orderHistory = s.orderHistory.concat(o)
        },

        addMany: (s, a:PayloadAction<UserOrderInterface[]>) => {
            const orders = a.payload
            s.orderHistory = s.orderHistory.concat(...orders)
        }
    }
})


export default orderSlice.reducer
export const orderActions = orderSlice.actions