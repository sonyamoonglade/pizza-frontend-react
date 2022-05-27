import React, {useMemo, useState} from 'react';

import './order.styles.scss'
import {TiArrowBack} from "react-icons/ti";
import {GrFormClose} from 'react-icons/gr'
import {
    orderActions,
    productActions,
    useAppDispatch,
    useAppSelector,
    windowActions,
    windowSelector
} from "../../../redux";
import {DeliveryDetails, UserOrderFormFields} from "../../../common/types";
import {baseUrl} from "../../product/productPresentation/ProductPresentation";
import OrderForm from "../orderForm/OrderForm";
import Check from "../check/Check";
import {useCart} from "../../../hooks/useCart";
import SubmitOrderButton from "../submitOrderButton/SubmitOrderButton";
import {useAxios} from "../../../hooks/useAxios";
import {useCreateOrder} from "../../../hooks/useCreateOrder";
import {useAuthentication} from "../../../hooks/useAuthentication";
import {useUserOrderForm} from "../hooks/useUserOrderForm";

export interface FormValuesInterface {
    is_delivered: boolean
    phone_number: string
    delivery_details?: DeliveryDetails
}



const Order = () => {
    const cart = useCart()
    const {client} = useAxios()
    const {createUserOrder} = useCreateOrder(client)
    const {login} = useAuthentication(client)
    const {userOrder} = useAppSelector(windowSelector)
    const dispatch = useAppDispatch()

    const {
        formValues,
        isSubmitButtonActive,
        setFormValues,
        setFormDefaults,
        getFormValues
    } = useUserOrderForm()


    function toggleOrder(){
        dispatch(windowActions.toggleUserOrder())
    }
    function closeAllModals(){
        dispatch(windowActions.closeAll())
    }


    async function handleOrderCreation(){

        const formValues = getFormValues()
        const usrCart = cart.getCart()
        const {phone_number} = formValues
        try {
            await login(phone_number)
        }catch (e) {
            console.log(e)
            return dispatch(windowActions.startErrorScreen())
        }

        try {
            const {order} = await createUserOrder(formValues, usrCart)
            cart.clearCart()
            setFormDefaults()
            dispatch(productActions.setCartEmpty(true))
            dispatch(orderActions.addOne(order))
            setFormValues((p) => {
                p.phone_number.isValid = false
                return p
            })
        }catch (e) {
            console.log(e)
            dispatch(windowActions.toggleLoading(false));
            setFormValues((p) => {
                const s = {...p}
                s.phone_number.value = ""
                s.phone_number.isValid = false
                return s
            })
            return dispatch(windowActions.startErrorScreen())
        }
}


    return (
        <div className={userOrder ? 'make_user_order modal modal--visible' : 'make_user_order modal'}>
            <div className="user_order_header">
                <TiArrowBack onClick={() => toggleOrder()} className='user_order_back_icon' size={30} />
                <p className='user_order_title'>Оформление заказа</p>
                <GrFormClose onClick={() => closeAllModals()} className='user_order_close_icon' size={30} />
            </div>
            <div className="make_user_order_form">

                <img className='badge_image' src={`${baseUrl}/non_verified_badge.png`} alt=""/>
                <p className='check_title'>Чек</p>

                <div className="form_top">
                    <Check cart={cart} />
                </div>
                <OrderForm
                    formValues={formValues}
                    setFormValues={setFormValues}
                />

                {userOrder && <SubmitOrderButton handler={ handleOrderCreation}  isActive={isSubmitButtonActive} />}

            </div>
        </div>
    );
};

export default React.memo(Order);