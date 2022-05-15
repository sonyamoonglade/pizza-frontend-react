import React, {FC} from 'react';
import {BiShoppingBag} from "react-icons/bi";
import CartButton from "../cartButton/CartButton";
import {CartInterface, DatabaseCartProduct} from "../../../../common/types";
import {currency} from "../../../../common/constans";
import {productSelector, useAppSelector} from "../../../../redux";

interface addToCartOnPresentationProps {
    addToCart: any
    isProductInCart: DatabaseCartProduct
    cart: CartInterface
    isNotified: boolean
}

const AddToCartOnPresentation:FC<addToCartOnPresentationProps> = (props) => {
    const {
        addToCart,
        isProductInCart,
        cart,
        isNotified
    } = props

    const {totalCartPrice,presentedProductCartQuantity,presentedProduct} = useAppSelector(productSelector)

    return (
        <div onClick={() => addToCart(presentedProduct)} className='add_to_cart_btn'>
            <div className='cart_icon_container'>
                {
                    isNotified &&
                    <div className='notification_dot'>&nbsp;</div>
                }
                <BiShoppingBag size={25} className='add_to_cart_icon' />
            </div>
            {
                isProductInCart ?
                    <CartButton
                        quantity={presentedProductCartQuantity}
                        cart={cart}
                    /> :
                    <p >Добавить в корзину</p>
            }
            <p className='total_cart_price'>
                {totalCartPrice} {currency}
            </p>
        </div>
    );
};

export default AddToCartOnPresentation;