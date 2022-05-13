import React, {FC} from 'react';
import {Product} from "../../../common/types";
import Leading from "./Leading";
import Trailing from "./Trailing";
import './product-card.styles.scss'

interface productCardProps {
    product: Product
}


const ProductCard:FC<productCardProps> = ({product}) => {
    return (
        <li className='product_card'>
            <Leading
               product={product}
            />
            <Trailing
                description={product.description}
                nutrients={product.features?.nutrients}
                energy_value={product.features?.energy_value}
            />
        </li>
    );
};

export default ProductCard;