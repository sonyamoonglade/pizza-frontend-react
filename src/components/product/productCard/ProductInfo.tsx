import React, {FC} from 'react';
import {Product} from "../../../common/types";
import {AiOutlinePlus} from "react-icons/ai";
import NutrientList from "../../nutrient/NutrientList";
import {productSlice, useAppDispatch} from "../../../redux";

interface productInfoProps {
    product: Product
}
const productActions = productSlice.actions

const ProductInfo:FC<productInfoProps> = ({product}) => {

    const {
        name,translate,
        price,category,description,
        currency,features} = product

    const dispatch = useAppDispatch()

    function startPresentationFn(product: Product){
        dispatch(productActions.startPresentation(product))
    }
    const baseUrl = 'http://localhost:5000/images/'

    return (
        <div className='product_info'>
            <div className="preview">
                <p className="category">{category}</p>
                <img className='image' src={`${baseUrl}/${product.id}.jpg`} alt=""/>
                <button className='start-presentation_btn' onClick={() => startPresentationFn(product)}>
                    <AiOutlinePlus className='add_btn_plus_icon' size={25} />
                </button>
            </div>
            <div className="text_info">
                <p className="description">
                    {description}
                </p>
                {
                    features.nutrients !== undefined &&
                    <NutrientList isPresentingNow={false} nutrients={features.nutrients}>
                        {features.energy_value !== undefined &&
                            <li className='energy_value'><p>{features.energy_value}ккал на 100г.</p></li>
                        }
                    </NutrientList>
                }
            </div>


        </div>
    );
};

export default ProductInfo;