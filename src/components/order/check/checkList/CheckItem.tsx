import React, {FC} from 'react';
import {DatabaseCartProduct, ProductCategories} from "../../../../common/types";

import '../check.styles.scss'

interface checkItemProps {
    product: DatabaseCartProduct
}

const CheckItem:FC<checkItemProps> = ({product: p}) => {
    return (
        <li className='check_item'>
            <p className='check_item_title'>
                {p.translate}
                {p.category === ProductCategories.pizza && " пицца"}
            </p>
            <p className='check_item_summary'>{p.price}.0 * {p.quantity} = {p.price * p.quantity}.0</p>
        </li>
    );
};

export default CheckItem;