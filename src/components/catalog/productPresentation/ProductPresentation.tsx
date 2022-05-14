import React, {useEffect, useRef, useState} from 'react';
import { productSelector, useAppSelector} from "../../../redux";
import NutrientList from "../../nutrient/NutrientList";
import '../productCard/product-card.styles.scss'
import './product-present.styles.scss'
import {DatabaseCartProduct, Product} from "../../../common/types";
import {BiShoppingBag} from 'react-icons/bi'
import {useCart} from "../../../hooks/useCart";

const currency = '₽'
const ProductPresentation = () => {

    const cart = useCart()



    const {presentedProduct,isPresentingNow} = useAppSelector(productSelector)
    const baseUrl = `http://localhost:5000/images`


    useEffect(() => {
        const body = document.querySelector('body')

        if(isPresentingNow){
            body!.style.overflow = 'hidden'
        }
        return () => {
            body!.style.overflow = 'visible'
        }
    }, [isPresentingNow])
    useEffect(() => {
        if(presentedProduct !== null) splitLongName()
    },[presentedProduct])

    const transitionRef = useRef(null)
    const defaultCartPrice = useRef(cart.calculateCartTotalPrice())


    const [isLongName, setIsLongName] = useState<boolean>(false)
    const [longName, setLongName] = useState<string>('')
    const [totalCartPrice, setTotalCartPrice] = useState<number>(defaultCartPrice.current)

    function splitLongName(){
        const {name} = presentedProduct
        const len = name.split(' ').length
        if(len === 1) {
            setIsLongName(false)
            return
        }
        const secondWord = name.split(' ').pop()
        setIsLongName(true)
        setLongName(secondWord)
    }

    function addToCart(product:Product){
        const cartProduct:DatabaseCartProduct = {
            id: product.id,
            quantity: 1,
            translate: product.translate,
            price: product.price
        }
        cart.addProduct(cartProduct)

        setTotalCartPrice(cart.calculateCartTotalPrice())
    }




    return (
        <div ref={transitionRef} className={ isPresentingNow ? 'product_presentation' : 'product_presentation hidden'}>
            {presentedProduct !== null &&
                <>
                    <div className='title presentation'>
                    <span>
                        <p className='name presentation'>{presentedProduct.name}</p>
                        {isLongName && <p className='long_name'>{longName}</p>}
                    </span>
                        <p className='price'>{presentedProduct.price} {currency}</p>
                    </div>
                    <img className='image' src={`${baseUrl}/${presentedProduct.id}.jpg`} alt=""/>
                    <div className='miscellaneous'>
                        <p className='description'>{presentedProduct.description}</p>
                        {presentedProduct.features.nutrients &&
                            <NutrientList isPresentingNow={isPresentingNow} nutrients={presentedProduct.features.nutrients}/>
                        }
                    </div>
                    <div className='cart_btn_container' >
                        <button onClick={() => addToCart(presentedProduct)} className='add_to_cart_btn'>

                            <div className='cart_icon_container'>
                                <BiShoppingBag size={25} className='add_to_cart_icon' />
                            </div>
                            Добавить в корзину

                            <p className='total_cart_price'>
                                {totalCartPrice} {currency}
                            </p>
                        </button>
                    </div>
                </>
            }
        </div>
    );
};

export default ProductPresentation;