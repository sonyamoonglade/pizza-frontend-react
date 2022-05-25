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

export interface FormValuesInterface {
    is_delivered: boolean
    phone_number: string
    delivery_details?: DeliveryDetails
}



const Order = () => {
    const formDefaults = {
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
    }
    const cart = useCart()
    const dispatch = useAppDispatch()
    const {client} = useAxios()
    const {createUserOrder} = useCreateOrder(client)
    const {login} = useAuthentication(client)
    const {userOrder} = useAppSelector(windowSelector)
    const [formValues, setFormValues] = useState<UserOrderFormFields>(formDefaults)
    const isActive = useMemo(() => {

        const values = Object.values(formValues)
        const withAddressAndAllValid = values.every(v => v.isValid)
        const withoutAddressAndRestValid = formValues.phone_number.isValid && !formValues.is_delivered.value
        const formValidity =  withAddressAndAllValid || withoutAddressAndRestValid

        return formValidity

    },[formValues])
    function toggleOrder(){
        dispatch(windowActions.toggleUserOrder())
    }
    function closeAllModals(){
        dispatch(windowActions.closeAll())
    }
    function getFormValues():FormValuesInterface{
        const adjacencyValues = new Map()
        for(const [k,v] of Object.entries(formValues)){
            adjacencyValues.set(k,v.value)
        }
        let delivery_details:DeliveryDetails = null;
        let finalValues: any;
        if(adjacencyValues.get("is_delivered")){
            delivery_details = {
                address: adjacencyValues.get("address"),
                entrance_number: Number(adjacencyValues.get("entrance_number")),
                flat_call: Number(adjacencyValues.get("flat_call")),
                floor: Number(adjacencyValues.get("floor")),
            }
            finalValues = {
                is_delivered: adjacencyValues.get("is_delivered"),
                delivery_details,
                phone_number: `+7${adjacencyValues.get("phone_number")}`,
            }

        }else {
            finalValues = {
                is_delivered: adjacencyValues.get("is_delivered"),
                phone_number: `+7${adjacencyValues.get("phone_number")}`,
            }
        }

        return finalValues
    }
    function setFormDefaults(){
        setFormValues(formDefaults)

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
            console.log(order)
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

    console.log(formValues)
    // todo: use hooks for animations
    //todo: hook useForm

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

                {userOrder && <SubmitOrderButton handler={ handleOrderCreation}  isActive={isActive} />}

            </div>
        </div>
    );
};

export default React.memo(Order);