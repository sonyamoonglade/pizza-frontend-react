import React, {FC} from 'react';
import {nutrients} from "../../common/types";

interface nutrientListProps {
    children?: any
    nutrients: nutrients
}

const NutrientList:FC<nutrientListProps> = ({children,nutrients}) => {
    return (
        <ul className='nutrients_list presentation'>
            <li className='nutrient'><p>Жиры: {nutrients.fats}г;</p></li>
            <li className='nutrient'><p>Углеводы: {nutrients.carbs}г;</p></li>
            <li className='nutrient'><p>Белки: {nutrients.proteins}г;</p></li>
            {children && children}
        </ul>
    );
};

export default NutrientList;