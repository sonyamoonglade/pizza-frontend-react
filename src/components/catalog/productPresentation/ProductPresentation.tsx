import React, {useEffect, useRef} from 'react';
import {useAppSelector} from "../../../redux/hooks/AppSelector";
import { productSelector} from "../../../redux/product/products.selectors";
import NutrientList from "../../nutrient/NutrientList";
import '../productCard/product-card.styles.scss'
import './product-present.styles.scss'

const currency = '₽'
const ProductPresentation = () => {


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

    const transitionRef = useRef(null)



    return (
        <div ref={transitionRef} className={ isPresentingNow ? 'product_presentation' : 'product_presentation hidden'}>
            {(presentedProduct !== null) &&
                <>
                    <div className='title'>
                    <span>
                        <p className='name'>{presentedProduct.name}</p>
                    </span>
                        <p className='price'>{presentedProduct.price} {currency}</p>
                    </div>
                    <img className='image' src={`${baseUrl}/${presentedProduct.id}.jpg`} alt=""/>
                    <div className='miscellaneous'>
                        <p className='description'>{presentedProduct.description}</p>
                        {presentedProduct.features.nutrients &&
                            <NutrientList nutrients={presentedProduct.features.nutrients}/>
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default ProductPresentation;