import React, {FC, useEffect, useState} from 'react';
import {currency} from "../../../common/constans";
import {baseUrl} from "../../product/productPresentation/ProductPresentation";
import {CartInterface, DatabaseCartProduct} from "../../../common/types";
import {productSelector, useAppSelector} from "../../../redux";
import CheckList from "./checkList/CheckList";

interface checkProps{
    cart: CartInterface
}

const Check:FC<checkProps> = ({cart}) => {

    const [checkProducts, setCheckProducts] = useState<DatabaseCartProduct[]>(cart.getCart())
    const {totalCartPrice} = useAppSelector(productSelector)

    useEffect(() => {
        setCheckProducts(cart.getCart())
    },[totalCartPrice])

    return (
        <div className='check_container'>
            <div className="check_content">
                <CheckList products={checkProducts} />
            </div>
            <div className="check_other">
                <div className='overall_check_price'>
                    <p>СУММА ЗАКАЗА</p>
                    <p>{cart.calculateCartTotalPrice()}.00 {currency}</p>
                </div>
            </div>
            <img className="check" src={`${baseUrl}/check_icon.png`} alt="" />
        </div>
    );
};

export default Check;