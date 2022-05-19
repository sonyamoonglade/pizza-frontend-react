import React, {useState} from 'react';

import './order.styles.scss'
import {TiArrowBack} from "react-icons/ti";
import {GrFormClose} from 'react-icons/gr'
import {useAppDispatch, useAppSelector, windowActions, windowSelector} from "../../../redux";
import FormInput from "../../formInput/FormInput";
import {createUserOrderFormFields} from "../../../common/types";
import {useFormValidations} from "../../../hooks/useFormValidations";
import {baseUrl} from "../../product/productPresentation/ProductPresentation";
import {currency} from "../../../common/constans";



const Order = () => {

    const dispatch = useAppDispatch()
    const {validatePhoneNumber, minLengthValidation} = useFormValidations()
    const {userOrder} = useAppSelector(windowSelector)

    function toggleOrder(){
        dispatch(windowActions.toggleUserOrder())
    }

    function closeAllModals(){
        dispatch(windowActions.closeAll())
    }



    const [formValues, setFormValues] = useState<createUserOrderFormFields>({
        address: "",
        entrance_number: "",
        flat_call: "",
        floor: "",
        is_delivered: false,
        phone_number: ""
    })


    const isDeliveryFormDisabledExpr = formValues["is_delivered"] ? "" : "--disabled "

    return (
        <div className={userOrder ? 'make_user_order modal modal--visible' : 'make_user_order modal'}>
            <div className="user_order_header">
                <TiArrowBack onClick={() => toggleOrder()} className='user_order_back_icon' size={30} />
                <p className='user_order_title'>Оформление заказа</p>
                <GrFormClose onClick={() => closeAllModals()} className='user_order_close_icon' size={30} />
            </div>
            <div className="make_user_order_form">

                <img className='badge_image' src={`${baseUrl}/non_verified_badge.png`} alt=""/>
                <p className='check_title'>Чек</p>

                <div className="form_top">
                    <div className='check_container'>
                        <div className="check_content">
                            <ul>
                                <li className='check_item'>
                                    <p className='check_item_title'>Доро пицца </p>
                                    <p className='check_item_summary'>381.00 * 2 = 729.0</p>
                                </li>
                                <li className='check_item'>
                                    <p className='check_item_title'>Гавайская пицца</p>
                                    <p className='check_item_summary'>152.00 * 1 = 152.0</p>
                                </li>
                                <li className='check_item'>
                                    <p className='check_item_title'>Вода без газа </p>
                                    <p className='check_item_summary'>79.00 * 3 = 212.0</p>
                                </li>

                            </ul>

                        </div>
                        <div className="other">
                            <p className='delivery_punishment'></p>
                            <div className='overall_check_price'>
                                <p>СУММА ЗАКАЗА</p>   <p>1137.00 {currency}</p>
                            </div>
                        </div>
                        <img className="check" src={`${baseUrl}/check_icon.png`} alt="" />
                    </div>
                </div>
                <div className='order_form' >
                    <div className="delivery_input">
                        <div className="is_delivered_checkbox">
                            <p className={isDeliveryFormDisabledExpr}>Нужна доставка?</p>
                            <input name={"is_delivered"} onChange={(e) => {
                                setFormValues((state) => {
                                    const prev = state.is_delivered
                                    return {...state,is_delivered:!prev}
                                 })
                                }} type="checkbox"
                            />
                        </div>
                        <FormInput
                            name={"address"}
                            type={"text"}
                            placeholder={"Пушкинская 29а"}
                            v={formValues["address"]}
                            setV={setFormValues}
                            onBlurValue={"ул."}
                            minLength={3}
                            maxLength={100}
                            extraClassName={`${formValues["is_delivered"] ? "" : "--disabled" } address_input`}
                            Regexp={new RegExp("[_!\"`'#%&:;<>=@{}~\\$\\(\\)\\*\\+\\/\\\\\\?\\[\\]\\^\\|]+")}
                            fieldValidationFn={minLengthValidation}

                        />
                        <div className="delivery_details_container">

                            <FormInput
                                name={"entrance_number"}
                                type={"text"}
                                placeholder={"1"}
                                v={formValues["entrance_number"]}
                                setV={setFormValues}
                                onBlurValue={"подъезд"}
                                maxLength={2}
                                minLength={1}
                                extraClassName={`${isDeliveryFormDisabledExpr}entrance_number_input`}
                                Regexp={new RegExp("[A-Za-z]+|[-!,._\"`'#%&:;<>=@{}~\\$\\(\\)\\*\\+\\/\\\\\\?\\[\\]\\^\\|]+")}
                                fieldValidationFn={minLengthValidation}

                            />

                            <FormInput
                                name={"flat_call"}
                                type={"text"}
                                placeholder={"5"}
                                v={formValues["flat_call"]}
                                setV={setFormValues}
                                onBlurValue={"кв."}
                                maxLength={3}
                                minLength={1}
                                extraClassName={`${isDeliveryFormDisabledExpr}flat_call_input`}
                                Regexp={new RegExp("[A-Za-z]")}
                                fieldValidationFn={minLengthValidation}

                            />

                            <FormInput
                                name={"floor"}
                                type={"text"}
                                placeholder={"9"}
                                v={formValues["floor"]}
                                setV={setFormValues}
                                onBlurValue={"этаж "}
                                maxLength={2}
                                minLength={1}
                                extraClassName={`${isDeliveryFormDisabledExpr}floor_input`}
                                Regexp={new RegExp("[A-Za-z]+|[-!,._\"`'#%&:;<>=@{}~\\$\\(\\)\\*\\+\\/\\\\\\?\\[\\]\\^\\|]+")}
                                fieldValidationFn={minLengthValidation}
                            />

                        </div>

                    </div>
                    <div className="contacts_input">
                        <div className='contacts_title'>
                            <p className='contacts_phone_title'>Номер телефона</p>
                            <small><i>*После оформления заказа мы позвоним вам для подтверждения</i></small>
                        </div>
                        <FormInput
                            name={'phone_number'}
                            type={'text'}
                            placeholder={'9524000770'}
                            v={formValues["phone_number"]}
                            setV={setFormValues}
                            onBlurValue={'+7'}
                            maxLength={10}
                            fieldValidationFn={validatePhoneNumber}
                            Regexp={new RegExp("[A-Za-z]+|[-!,._\"`'#%&:;<>=@{}~\\$\\(\\)\\*\\+\\/\\\\\\?\\[\\]\\^\\|]+")}
                            extraClassName={"phone_number_input"}
                            minLength={10}
                        />
                    </div>
                </div>





            </div>
        </div>
    );
};

export default Order;