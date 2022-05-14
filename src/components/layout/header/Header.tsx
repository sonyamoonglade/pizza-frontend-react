import React, {FC} from 'react';

import {CgMenuGridO} from 'react-icons/cg'
import {GrClose} from 'react-icons/gr'
import PromotionList from "../promotion/PromotionList";
import {Promotion} from "../../../common/types";


import './header.styles.scss'
import {menuState, useAppDispatch, useAppSelector, windowSlice} from "../../../redux";


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

    const menuOpened = useAppSelector(menuState)
    const dispatch = useAppDispatch()

    function toggleMenu(){
        dispatch(windowActions.toggleMenu())
    }

    return (
        <header>
            <div className='header_top'>
                <p onClick={nullifyScroll}>Пицца-Тупицца</p>
                {menuOpened ?
                    <GrClose onClick={toggleMenu} size={20} className='menu_close_icon' /> :
                    <CgMenuGridO onClick={toggleMenu} size={25} />
                }
            </div>
            <PromotionList promotions={mockPromotions} />
        </header>
    );
};

export default Header;