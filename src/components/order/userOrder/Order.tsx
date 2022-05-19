import React, {useMemo, useState} from 'react';

import './order.styles.scss'
import {TiArrowBack} from "react-icons/ti";
import {GrFormClose} from 'react-icons/gr'
import {useAppDispatch, useAppSelector, windowActions, windowSelector} from "../../../redux";
import {UserOrderFormFields} from "../../../common/types";
import {baseUrl} from "../../product/productPresentation/ProductPresentation";
import OrderForm from "../orderForm/OrderForm";
import Check from "../check/Check";
import {useCart} from "../../../hooks/useCart";
import SubmitOrderButton from "../submitOrderButton/SubmitOrderButton";
import formInput from "../../formInput/FormInput";



const Order = () => {

    const dispatch = useAppDispatch()
    const {userOrder} = useAppSelector(windowSelector)

    const cart = useCart()

    function toggleOrder(){
        dispatch(windowActions.toggleUserOrder())
    }

    function closeAllModals(){
        dispatch(windowActions.closeAll())
    }

    //todo: apply slide-in animation



    const [formValues, setFormValues] = useState<UserOrderFormFields>({
        address: {
            value:"",
            isValid: false
        },
        entrance_number: {
            value:"",
            isValid: false
        },
        flat_call: {
            value:"",
            isValid: false
        },
        floor: {
            value:"",
            isValid: false
        },
        is_delivered: {
            value: false,
            isValid: true
        },
        phone_number: {
            value:"",
            isValid: false
        }
    })

    const isActive = useMemo(() => {

        const values = Object.values(formValues)
        const withAddressAndAllValid = values.every(v => v.isValid)
        const withoutAddressAndRestValid = formValues.phone_number.isValid && !formValues.is_delivered.value
        const formValidity =  withAddressAndAllValid || withoutAddressAndRestValid

        return formValidity

    },[formValues])

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

                {userOrder && <SubmitOrderButton isActive={isActive} />}

            </div>
        </div>
    );
};

export default Order;