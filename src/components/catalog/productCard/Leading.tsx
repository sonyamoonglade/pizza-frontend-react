import React, {FC, useContext} from 'react';
import {AiOutlinePlus} from 'react-icons/ai'
import {Product} from "../../../common/types";
import {useAppDispatch} from "../../../redux/hooks/AppDispatch";
import {productSlice} from "../../../redux/product/product.slice";
import {currency} from "../../../common/constans";

interface leadingProps {
    product: Product
}
const productActions = productSlice.actions
const Leading:FC<leadingProps> = ({product}) => {

    const {name,translate,price,category} = product

    const dispatch = useAppDispatch()

    function startPresentationFn(product: Product){
        console.log('q')
        dispatch(productActions.startPresentation(product))
    }
    const baseUrl = 'http://localhost:5000/images/'
    return (
        <div className="leading">
            <div className="title">
                    <span>
                        <p className="name">
                            {name}
                            <small>/</small>
                        </p>
                        <p className="translate">
                            {translate}
                        </p>
                    </span>
                <p className="price">{price} {currency}</p>
            </div>
            <div className="preview">
                <p className="category">{category}</p>
                <img className='image' src={`${baseUrl}/${product.id}.jpg`} alt=""/>
                <button className='start-presentation_btn' onClick={() => startPresentationFn(product)}>
                    <AiOutlinePlus className='add_btn_plus_icon' size={25} />
                </button>
            </div>
        </div>
    );
};

export default Leading;