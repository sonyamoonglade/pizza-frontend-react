import React, {FC, useState} from 'react';
import {Promotion} from "../../../common/types";
import PromotionCard from "./promotionCard/PromotionCard";
import './promotion.styles.scss'

interface promotionListProps {
    promotions: Promotion[]
}

const PromotionList:FC<promotionListProps> = ({promotions}) => {

    const [touchedPromotions,setTouchedPromotions] = useState<Map<number,boolean>>(makeState())

    function makeState(){
        const m = new Map<number,boolean>()
        for(const promotion of promotions){
            m.set(promotion.id,false)
        }
        return m
    }

    function touch(product_id: number){
        const m = new Map(touchedPromotions)
        const prev = m.get(product_id)
        m.set(product_id,!prev)
        setTouchedPromotions(() => m)
    }

    return (

            <ul className='promotion_list'>
                {promotions.map((p) => {
                    const isTouched = touchedPromotions.get(p.id)
                    return (
                        <PromotionCard promotion={p} touchFn={touch} isTouched={isTouched}/>
                    )
                })}
            </ul>

    );
};

export default PromotionList;