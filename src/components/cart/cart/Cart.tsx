import React, {useEffect, useState} from 'react';
import {TiArrowBack} from 'react-icons/ti'
import './cart.styles.scss'
import {productSelector, useAppDispatch, useAppSelector, windowActions, windowSelector} from "../../../redux";
import {useCart} from "../../../hooks/useCart";
import {DatabaseCartProduct} from "../../../common/types";
import CartItem from "../cartItem/CartItem";
import ExtraList from "../../extraList/ExtraList";


const Cart = React.memo(() => {


        const {cart: cartModel} = useAppSelector(windowSelector)
        const {isCartEmpty, totalCartPrice} = useAppSelector(productSelector)

        const dispatch = useAppDispatch()
        const cart = useCart()
        const [cartProducts,setCartProducts] = useState<DatabaseCartProduct[]>(cart.getCart())

        function toggleCart() {
            dispatch(windowActions.toggleCart())
        }

        useEffect(() => {
            if(isCartEmpty){
                console.log('here')
                setCartProducts([])
            }
        },[isCartEmpty])

        useEffect(() => {
            setCartProducts(cart.getCart())
        },[totalCartPrice])



        return (
            <div className={cartModel ? 'cart modal modal--visible' : 'cart modal'}>

                <div className="cart_header">
                    <TiArrowBack onClick={() => toggleCart()} className='cart_back_icon' size={30} />
                    <p>Корзина</p>
                </div>

                <ul className="cart_list">
                    {cartProducts &&
                        cartProducts.map(p => (
                            <CartItem key={p.id} product={p}/>
                        ))}

                </ul>
                <div className="cart_extra">
                    <div className="cart_extra_header">
                        <p className='extra_title'>Добавить к заказу</p>
                    </div>
                    <ExtraList updateCart={setCartProducts} />
                </div>
            </div>
        );

})
export default Cart;