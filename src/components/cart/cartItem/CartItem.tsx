import React, {FC, useMemo} from 'react';

import './cart-item.styles.scss'
import {DatabaseCartProduct} from "../../../common/types";
import {currency} from "../../../common/constans";

interface cartItemProps {
    product: DatabaseCartProduct
}

const CartItem:FC<cartItemProps> = ({product}) => {

    const baseUrl = 'http://localhost:5000/images'

    const productImage = useMemo(() => {
        return `${baseUrl}/${product.id}.jpg`
    },[product])

    return (
        <li className='cart_item'>
            <div className="leading">
                <img className='cart_item_image' src={productImage} alt=""/>
                <div className="info">
                    <p className='cart_item_translate'>{product.translate}</p>
                    <p className='cart_item_price'>{product.price} {currency}</p>
                </div>
            </div>

            <div className='price_info'>
                <p className='cart_item_quantity'>
                    {product.quantity}
                    <i> шт</i>
                </p>
                <i className='quantity_price'>{product.quantity * product.price} {currency}</i>
            </div>

        </li>
    );
};

export default CartItem;