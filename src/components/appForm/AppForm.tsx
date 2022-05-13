import React from 'react';
import {useAppDispatch} from "../../redux/hooks/AppDispatch";
import {useAppSelector} from "../../redux/hooks/AppSelector";
import {productSlice} from "../../redux/product/product.slice";
import {productSelector} from "../../redux/product/products.selectors";


const productActions = productSlice.actions

const AppForm = () => {

    const dispatch = useAppDispatch()
    const {isPresentingNow} = useAppSelector(productSelector)

    function stopPresentation(){
        dispatch(productActions.stopPresentation())
    }

    return (
        <div onClick={() => stopPresentation()} className={isPresentingNow ? 'app_form visible' : "app_form"}>
            <span></span>
        </div>
    );
};

export default AppForm;