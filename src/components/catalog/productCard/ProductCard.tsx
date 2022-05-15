import React, {FC} from 'react';
import {Product} from "../../../common/types";

import './product-card.styles.scss'
import ProductHeading from "./ProductHeading";
import ProductInfo from "./ProductInfo";

interface productCardProps {
    product: Product
}


const ProductCard:FC<productCardProps> = ({product}) => {
    return (
        <li className='product_card'>
            <ProductHeading
               name={product.name}
               translate={product.translate}
               price={product.price}
            />
            <ProductInfo
               product={product}
            />
        </li>
    );
};

export default ProductCard;