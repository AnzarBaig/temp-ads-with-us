import React, { useEffect, useState } from 'react'
import CustomText from '../Text/CustomText'
import { Language } from '@/locales/Language'
import { getLanguage } from '@/storage/storage'
import HeaderTitle from '../Header/HeaderTitle'
import LookingForForm from '../Form/LookingForForm'
import Query from '@/assets/images/svg/query.svg'
import Image from 'next/image'
import CommonForm from '../Form/CommonForm'
import { sendEmailToBuy } from '@/Contants/APIEndpoint'
import CommonFormForHome from '../Form/CommonFormForHome'


export default function WhatAreYouLookingFor() {
  const [currentLanguage, setCurrentLanguage] = useState(null)

  useEffect(() => {
    if (currentLanguage === null) {
      let cl = getLanguage()
      if (cl === undefined || cl === null) {
        setCurrentLanguage('en')
      } else {
        setCurrentLanguage(cl)
      }
    }
  }, [])



  return (
    <div className='shadow-lg rounded-2xl'>
      <div className='grid ms:grid-cols-1 l:grid-cols-6'>
        <div className='ms:text-center l:text-left py-8 bg-headupb2b text-white col-span-2 relative ms:rounded-tl-2xl ms:rounded-tr-2xl l:rounded-tr-none l:rounded-l-2xl'>
          <div className='flex flex-col'>
            <CustomText text={Language?.[currentLanguage]?.WhatAreYouLookingForP1} className={`text-2xl ms:px-4 l:pl-4 l:text-[38px] l:leading-[46px] ll:pl-10`} />
            <CustomText text={Language?.[currentLanguage]?.WhatAreYouLookingForP2} className={`text-2xl ms:px-4 l:pl-4 l:text-[38px] l:leading-[46px] ll:pl-10`} />
          </div>
          <div className='absolute inset-x-0 bottom-0 flex justify-center ms:hidden l:block'>
            <div className='flex justify-center items-center'>
              <Image src={Query} width={390} />
            </div>
          </div>
        </div>
        <div className='bg-purple py-4 col-span-4 ms:rounded-b-xl l:rounded-r-2xl'>
          <CommonFormForHome endPoint={sendEmailToBuy} />
        </div>
      </div>
    </div>
  );

}
