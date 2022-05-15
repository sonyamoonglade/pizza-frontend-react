import React, {FC} from 'react';
import ProductCard from "../productCard/ProductCard";
import {Product} from "../../../common/types";
import './catalog.styles.scss'

interface catalogProps {
    productList: Product[]

}

const Catalog:FC<catalogProps> = ({productList}) => {


    return (
        <ul className='catalog'>
            {productList.map((p) => (
                <ProductCard product={p} key={p.id} />
            ))}
        </ul>
    );
};

export default Catalog;