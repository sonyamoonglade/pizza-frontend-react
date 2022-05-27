import React from 'react';
import {useAppDispatch, useAppSelector, windowActions, windowSelector} from "../../../../redux";
import {FaRegUserCircle} from 'react-icons/fa'
import {BsClipboardData,BsCart4} from 'react-icons/bs'
import {MdOutlineReceiptLong} from 'react-icons/md'
import {FcAbout} from 'react-icons/fc'
import './mob-navigation.styles.scss'
import '../../layout/layout.styles.scss'


const Navigation = () => {

    const {navigation, navigationNotification} = useAppSelector(windowSelector)

    const dispatch = useAppDispatch()


    return (
        <div className={navigation ? "modal modal--visible" : "modal"}>
            <ul className='nav_list'>
                <li className='nav_item'>
                    <p>Войти</p>
                    <FaRegUserCircle />
                </li>
                <li className='nav_item'>
                    <p>О нас</p>
                    <FcAbout />
                </li>
                <li className='nav_item'>
                    <p>Больше информации</p>
                    <BsClipboardData />
                </li>
                <li onClick={() => {
                    dispatch(windowActions.toggleCart())
                    setTimeout(() => {
                        dispatch(windowActions.toggleNavigation())
                    },350)
                }}
                    className='nav_item'>
                    {!navigationNotification.cart && <div className='navigation_dot'>&nbsp;</div>}
                    <p>Корзина</p>
                    <BsCart4 />
                </li>
                <li  className='nav_item'>
                    {!navigationNotification.orders && <div className='navigation_dot order'>&nbsp;</div>}
                    <p>Заказы</p>
                    <MdOutlineReceiptLong />
                </li>
            </ul>
        </div>
    );
};

export default Navigation;