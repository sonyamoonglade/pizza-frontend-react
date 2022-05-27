import React, {useEffect, useRef, useState} from 'react';
import EventEmitter from "events";

import './order-history.styles.scss'
import {getOrderHistory, orderSelector, useAppDispatch, useAppSelector, userSelector} from "../../redux";
import {useAxios} from "../../hooks/useAxios";
import {log} from "util";

const OrderHistory = () => {

    const em = new EventEmitter()
    const {client} = useAxios()

    const dispatch = useAppDispatch()
    const {hasMore,orderHistory} = useAppSelector(orderSelector)
    const {isAuthenticated} = useAppSelector(userSelector)
    console.log(orderHistory)
    const lastRef = useRef<HTMLParagraphElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)


    // initial orders fetched from useEffect...
    const [fetching, setFetching] = useState<boolean>(false)
    const [limit, setLimit] = useState<number>(10)

    const [DCH, setDCH] = useState<number>(0)
    const [scrollH, setScrollH] = useState<number>(0)
    const [DPH, setDPH] = useState<number>()

    const [error, setError] = useState(null)

    function calculateScroll (n: number,SH: number, DPH: number, DCH: number): number{
        return (n - (n * SH) / (DPH)) * DCH
    }

    useEffect(() => {

        if(!isAuthenticated){
            setError("Пользователь не авторизован!")
            return
        }

        try {
            dispatch(getOrderHistory(client, limit))
        }catch (e: any){
            console.log(e)
            setError(e.message)
        }finally {
            if(hasMore){
                setLimit(lim => lim + 10)
            }
        }

        if(lastRef.current !== null){
            setDCH(lastRef.current.getBoundingClientRect().height)
        }
        if(scrollRef.current !== null){
            setDPH(scrollRef.current.getBoundingClientRect().height)
        }



        
    },[isAuthenticated])
    useEffect(() => {
        if(DPH && DCH){
            const n = orderHistory.length
            const SH = window.screen.height
            const r = calculateScroll(n, SH, DPH, DCH)
            const delta = calculateDelta(r)
            const absV = r-delta
            console.log(absV,window.scrollY)
            setScrollH(absV)
        }
    },[DPH, DCH, orderHistory.length])
    useEffect(() => {
        if(limit !== 10){
            setLimit(lim => lim + 10)
        }
    },[hasMore])

    function calculateDelta (scrollH: number){
        return scrollH * 0.01
    }

    em.addListener("expand", function (){
        if(!isAuthenticated){
           return setError("Пользователь не авторизован")
        }

        setFetching(true)
        setTimeout( () => {
            // set orders here

            if (hasMore) {
                try {
                    dispatch(getOrderHistory(client, limit))
                } catch (e: any) {
                    console.log(e.message)
                }
            }
            setFetching(false)
        },1500)



    })
    window.onscroll = function (){
        const currentScroll = window.scrollY
        if(currentScroll >= scrollH){
            if(!fetching) return em.emit("expand")
            return
        }
    }




    useEffect(() => {
        if(scrollRef.current !== null){
            const DPH = scrollRef.current.getBoundingClientRect().height
            setDPH(DPH)
        }
    },[orderHistory])


    return (
        <div ref={scrollRef} className='testing' >
            {orderHistory && orderHistory.map((_,i)=> {
               if(i === orderHistory.length - 1) return <div ref={lastRef}><strong>{i + 1}</strong> I AM GOOD DIV Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, in.</div>
               return <div><strong>{i + 1}</strong> I AM GOOD DIV Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, in.</div>
            })}
            {fetching && hasMore &&  <strong>Загрузка....</strong>}
            {!orderHistory && !fetching && <p>У вас пока нет заказов!</p>}
        </div>
    );
};

export default React.memo(OrderHistory);