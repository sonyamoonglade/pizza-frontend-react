import React, {FC} from 'react';
import {nutrients} from "../../../common/types";
import NutrientList from "../../nutrient/NutrientList";

interface trailingProps {
    description: string
    nutrients?: nutrients
    energy_value?: number
}

const Trailing:FC<trailingProps> = ({description,nutrients,energy_value}) => {

    return (
        <div className='trailing'>
            <p className="description">
                {description}
            </p>
            {
                nutrients !== undefined &&
                <NutrientList nutrients={nutrients}>
                    {energy_value !== undefined &&
                        <li className='energy_value'><p>{energy_value}ккал на 100г.</p></li>
                    }
                </NutrientList>
            }

        </div>
    );
};

export default Trailing;