import React from 'react'
import CustomText from '../Text/CustomText'
import Link from 'next/link'
import { Gradient, GradientText } from '@/Contants/constant'

export default function CallAndChat() {
  const IconComponent = ({ title, className }) => {
    return <div className='flex flex-col items-center '>
      {
        className !== 'icon-whatsapp' ?
          <span className={`my-1 ${className} mm:text-2xl ll:text-4xl cursor-pointer`}></span> :
          <span class="icon-whatsapp my-1 mm:text-2xl ll:text-4xl cursor-pointer"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
      }
      <label className='mm:text-xs ll:text-md tracking-wider cursor-pointer'>{title}</label>
    </div>
  }
  return (
    <div className='grid ms:grid-cols-2 ms:gap-2 ll:grid-cols-2 ll:gap-4'>
      <Link href="tel:+917210199772">
        <div className={`${Gradient} ms:py-2 t:py-4 ll:py-8 ll:px-34 flex justify-center rounded-2xl text-white cursor-pointer items-center`}>
          <div className='flex flex-row hover:scale-x-105  transaction-delay'>
            <div className='mx-1'><IconComponent className={'icon-phone-call '} /></div>
            <div className='mx-1 '><CustomText text={'Call  us'} className={'ms:text-sm mm:text-md ll:text-4xl cursor-pointer'} /></div>
          </div>
        </div>
      </Link>
      <Link href="https://wa.me/+918595736388" target='_blank'>
        <div className={`${Gradient} ms:py-2 t:py-4 ll:py-8 ll:px-34 flex justify-center rounded-2xl text-white cursor-pointer items-center`}>
          <div className='flex flex-row hover:scale-x-105  transaction-delay'>
            <div className='mx-1'><IconComponent className={'icon-whatsapp'} /></div>
            <div className='mx-1'><CustomText text={'Chat with  us'} className={'ms:text-sm mm:text-md ll:text-4xl cursor-pointer'} /></div>
          </div>
        </div>
      </Link>
    </div>
  )
}
