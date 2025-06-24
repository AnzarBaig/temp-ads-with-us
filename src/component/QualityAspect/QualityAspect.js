import { Gradient } from '@/Contants/constant'
import { Language } from '@/locales/Language'
import React from 'react'

export default function QualityAspect() {
    let CurrentLanguage = 'en'
    const IconComponent = ({ title, className }) => {
        return <div className='flex flex-col'>
            <span className={`my-1 ${className} ms:text-2xl mm:text-2xl ll:text-4xl 4k:text-8xl`}></span>
            <label className='ms:text-xs mm:text-xs ll:text-md 4k:text-3xl tracking-wider '>{title}</label>
        </div>
    }

    return (
        <div className='text-white w-full text-center'>
            <div className={`${Gradient} flex justify-around items-center ms:mx-2 t:mx-32 ll:mx-[450px] imac:mx-[600px] 4k:mx-[600px] rounded-full py-3 px-3 animate__animated animate__fadeInUp`}>
                <div><IconComponent className={'icon-quality'} title={Language?.[CurrentLanguage]?.AssuredQuality} /></div>
                <div><IconComponent className={'icon-delivery'} title={Language?.[CurrentLanguage]?.OnTimeDelivery} /></div>
                <div><IconComponent className={'icon-finance'} title={Language?.[CurrentLanguage]?.EaseofFinance} /></div>
            </div>
        </div>
    )
}
