import React from 'react';
import {BiShoppingBag} from "react-icons/bi";
import {productSelector, useAppDispatch, useAppSelector, windowActions} from "../../../../redux";

import './cart-link.styles.scss'
import {currency} from "../../../../common/constans";

const CartLink = () => {

    const {totalCartPrice} = useAppSelector(productSelector)
    const dispatch = useAppDispatch()

    function toggleCart (){
        dispatch(windowActions.toggleCart())
    }

    return (
        <button onClick={() => toggleCart() } className='cart_link'>

            <BiShoppingBag className='cart_icon' size={30} />
            <span className='cart_title'>Корзина</span>
            <span className='cart_price link'>{totalCartPrice} {currency}</span>

        </button>
    );
};

export default CartLink;