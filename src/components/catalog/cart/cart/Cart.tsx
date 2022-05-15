import React from 'react';
import {useAppDispatch, useAppSelector, windowActions, windowSelector} from "../../../../redux";
import {TiArrowBack} from 'react-icons/ti'
import './cart.styles.scss'
import {useCart} from "../../../../hooks/useCart";
import {DatabaseCartProduct} from "../../../../common/types";
import CartItem from "../cartItem/CartItem";

const Cart = () => {

    const {cart: cartModel} = useAppSelector(windowSelector)
    const dispatch = useAppDispatch()
    const cart = useCart()

    const cartProducts:DatabaseCartProduct[] = cart.getCart()

    function toggleCart() {
        dispatch(windowActions.toggleCart())
    }

    return (
        <div className={cartModel ? 'cart modal modal--visible' : 'cart modal'}>

            <div className="cart_header">
                <TiArrowBack onClick={() => toggleCart()} className='cart_back_icon' size={30} />
                <p>Корзина</p>
            </div>

            <ul className="cart_list">
                {cartProducts.map(p => (
                    <CartItem product={p} />
                ))}
            </ul>



        </div>
    );
};

export default Cart;