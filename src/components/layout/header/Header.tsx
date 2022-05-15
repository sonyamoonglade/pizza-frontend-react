import React, {FC} from 'react';

import {CgMenuGridO} from 'react-icons/cg'
import {GrClose} from 'react-icons/gr'
import PromotionList from "../promotion/PromotionList";
import {Promotion} from "../../../common/types";
import '../layout/layout.styles.scss'


import './header.styles.scss'
import {useAppDispatch, useAppSelector, windowSelector, windowSlice} from "../../../redux";
import Navigation from "../navigation/mobile/Navigation";
import OpenCloseButton from "../openCloseButton/OpenCloseButton";
import Cart from "../../catalog/cart/cart/Cart";


const mockPromotions:Promotion[] = [
    {
        id:1,
        title:'Скидка 10% на доставку с понедельника по четверг',
        touched_text:'На все заказы, оформленные с понедельника по четверг с 11:00 до 16:00.',
        touched_title: 'Скидка 10% на доставку',
    },{
        id:2,
        title:'Акция!  2 пиццы по цене 3!',
        touched_text:'Акция действует с 25 мая по 31 июля. Успей получить халяву!',
        touched_title: 'Две по цене трех',
    }
]
const windowActions = windowSlice.actions


const Header:FC = () => {

    function nullifyScroll(){
        const steps = 50
        let i = 0;
        let interval = setInterval(() => {

            const currentScroll = window.scrollY
            const perStep = currentScroll / steps

            if(window.scrollY === 0) {
                clearInterval(interval)
            }
            window.scroll({top:currentScroll - perStep})
            i++
        },5)

    }

    const {menu} = useAppSelector(windowSelector)
    const dispatch = useAppDispatch()

    function toggleMenu(){
        dispatch(windowActions.toggleMenu())
    }

    return (
        <header>
            <div className='header_top'>
                <p onClick={nullifyScroll}>Пицца-Тупицца</p>
                <OpenCloseButton modalState={menu} toggleModalFn={toggleMenu} />
            </div>
            <PromotionList promotions={mockPromotions} />

            <Cart />
            <Navigation />

        </header>
    );
};

export default Header;