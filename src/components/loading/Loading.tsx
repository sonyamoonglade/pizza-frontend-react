import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector, windowActions, windowSelector} from "../../redux";
import './loading.styles.scss'
import {SpinnerCircular} from 'spinners-react'
import {FaCheckCircle} from 'react-icons/fa'
import {useCreateOrder} from "../../hooks/useCreateOrder";
import {useAxios} from "../../hooks/useAxios";

interface loadingProps {
   duration: number
}

enum loadingSteps {
    "starting" = "Отправляем заказ в пиццерию",
    "middle" = "Создаем заказ",
    "finish" = "Подготавливаем печи",
    "afterFinish" = "Готово!"
}

const Loading:FC<loadingProps> = ({duration}) => {

    const {loading} = useAppSelector(windowSelector)
    const dispatch = useAppDispatch()
    const [dots,setDots] = useState(".")
    const [loadingStep, setLoadingStep] = useState<loadingSteps>(loadingSteps.starting)



    const [stopDots, setStopDots] = useState(false)

    useEffect(() => {
        if(loading){
            const timePerStep = duration / 3
            const stepsAnimationInterval = setInterval(() => {
                stepsAnimation()
            },timePerStep)
            if(loadingStep === loadingSteps.finish){
                setTimeout(() => {
                    clearInterval(stepsAnimationInterval)
                    stopDotsAnimation()
                    setTimeout(() => {
                        finishLoadingAndCloseAllModals()
                    },2000)
                },2000)
            }
            return () => {
                clearInterval(stepsAnimationInterval)
            }
        }

    },[loading, loadingStep])
    useEffect(() => {
        let i: any;
        if(loading && !stopDots){
            i = setInterval(() => {
                dotsAnimation()
            },500)
        }

        return () => clearInterval(i)

    },[loading,dots,stopDots])
    useEffect(() => {
        setDefaults()
        return () => {
            setTimeout(() => {
                setDefaults()
            },1000)
        }
    },[loading])

    function stopDotsAnimation(){
        setLoadingStep(loadingSteps.afterFinish)
        setDots("")
        setStopDots(true)
    }
    async function finishLoadingAndCloseAllModals(){
        dispatch(windowActions.toggleLoading(false))
        dispatch(windowActions.closeAll())




    }
    function dotsAnimation(){
        if(dots.length < 3){
            setDots(p => {
                const v =  p + "."
                return  v
            })
        }else {
            setDots(".")
        }
    }
    function stepsAnimation(){
        if(loadingStep === loadingSteps.starting){
            setLoadingStep(loadingSteps.middle)
        }
        else if(loadingStep === loadingSteps.middle){
            setLoadingStep(loadingSteps.finish)
        }
    }
    function setDefaults(){
        setDots(".")
        setLoadingStep(loadingSteps.starting)
        setStopDots(false)
    }

    

    return (
        <div className={loading ? 'modal loading modal--visible' : 'modal loading'}>
            <div className="loading_content">
                {loadingStep !== loadingSteps.afterFinish && loading ?
                    <SpinnerCircular size={150} secondaryColor={"#ffc535"} color={"#3cb46e"} enabled={loading}/> :
                    <FaCheckCircle color={"#3cb46e"} size={60}/>
                }
                <p>{loadingStep}{dots}</p>
            </div>
        </div>
    );
};

export default React.memo(Loading);