import React, {useState} from 'react';

import './order.styles.scss'
import {TiArrowBack} from "react-icons/ti";
import {GrFormClose} from 'react-icons/gr'
import {useAppDispatch, useAppSelector, windowActions, windowSelector} from "../../../redux";
import FormInput from "../../formInput/FormInput";

const Order = () => {

    const dispatch = useAppDispatch()
    const {userOrder} = useAppSelector(windowSelector)

    function toggleOrder(){
        dispatch(windowActions.toggleUserOrder())
    }

    function closeAllModals(){
        dispatch(windowActions.closeAll())
    }

    const [formValues, setFormValues] = useState({
        email: ''
    })

    return (
        <div className={userOrder ? 'make_user_order modal modal--visible' : 'make_user_order modal'}>
            <div className="user_order_header">
                <TiArrowBack onClick={() => toggleOrder()} className='user_order_back_icon' size={30} />
                <p className='user_order_title'>Оформление заказа</p>
                <GrFormClose onClick={() => closeAllModals()} className='user_order_close_icon' size={30} />
            </div>
            <div className="make_user_order">
                {/*<h2>{formValues["email"]}</h2>*/}
                {/*<FormInput*/}
                {/*    name={'email'}*/}
                {/*    type={'text'}*/}
                {/*    placeholder={'Email'}*/}
                {/*    v={formValues["email"]}*/}
                {/*    setV={setFormValues}*/}
                {/*    labelText={'email'}*/}
                {/*/>*/}
            </div>
        </div>
    );
};

export default Order;