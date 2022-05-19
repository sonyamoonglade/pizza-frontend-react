import React, {FC, useEffect, useRef} from 'react';

import './subm-order.styles.scss'
import {useAppDispatch, windowActions} from "../../../redux";

interface submitOrderButtonProps {
    isActive: boolean
}

const SubmitOrderButton:FC<submitOrderButtonProps> = ({isActive}) => {

    const bounceAnimationRef = useRef<HTMLParagraphElement>(null)
    const slideAnimationRef = useRef<HTMLButtonElement>()
    useEffect(() => {
        startSlideAnimation()
    },[])

    useEffect(() => {
        let i: any;
        if(isActive) {
            startBounceAnimation()
            i = setInterval(() => {
                startBounceAnimation()
            },2500)
        }

        return () => {
            if(bounceAnimationRef.current !== null) bounceAnimationRef.current.getAnimations().forEach((a) => a.finish())
            clearInterval(i)
        }
    },[isActive])

    function startSlideAnimation (){
        slideAnimationRef.current.animate([
            {transform:'translateX(100%)'},
            {transform:'translateX(0)'}
        ],{
            duration: 400,
            easing: 'ease',
            delay: 0

        })
    }

    function startBounceAnimation(){
       return bounceAnimationRef.current.animate([
            {transform:'translateY(0)'},
            {transform:'translateY(-1px)'},
           {transform:'translateY(0)'},

       ],{
            duration: 700,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            direction: "normal"
        })
    }

    const dispatch = useAppDispatch()

    return (
        <button
            ref={slideAnimationRef}
            className={isActive? 'submit_order_button --active' : 'submit_order_button '}
        >
            <p ref={bounceAnimationRef}>Оформить заказ!</p>
        </button>
    );
};

export default SubmitOrderButton;