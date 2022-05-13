import React, {FC} from 'react';
import ProductCard from "../productCard/ProductCard";
import {Product} from "../../../common/types";
import './catalog.styles.scss'

interface catalogProps {
    productList: Product[]

}

const Catalog:FC<catalogProps> = ({productList}) => {

    console.log(productList)

    return (
        <ul className='catalog'>
            {productList.map((product) => (
                <ProductCard product={product} />
            ))}
        </ul>
    );
};

export default Catalog;