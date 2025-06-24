import Image from 'next/image'
import React from 'react'
import LogoDark from '@/assets/images/favicon.png'
import { ConvertTime, getFormattedDate } from '@/Utils/Utils'


export default function WriterInfo({data}) {



    return (
        <div className='grid grid-cols-2 gap-4'>
            <div className='flex items-center gap-6'>
                <div><Image src={LogoDark} className='rounded-full aspect-square w-12 object-cover bg-purple' /></div>
                <div>
                    <div>Admin</div>
                    <div>{getFormattedDate(ConvertTime(data?.date), ['date','month', 'year'])}</div>
                </div>
            </div>
            <div>Share</div>
        </div>
    )
}
