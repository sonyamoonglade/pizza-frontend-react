import React from 'react';
import {useAppSelector, windowSelector} from "../../../../redux";
import {FaRegUserCircle} from 'react-icons/fa'
import {BsClipboardData,BsCart4} from 'react-icons/bs'
import {FcAbout} from 'react-icons/fc'
import './mob-navigation.styles.scss'
import '../../layout/layout.styles.scss'

const Navigation = () => {

    const {menu} = useAppSelector(windowSelector)

    return (
        <div className={menu ? "modal modal--visible" : "modal"}>
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
                <li className='nav_item'>
                    <p>Корзина</p>
                    <BsCart4 />
                </li>
            </ul>
        </div>
    );
};

export default Navigation;