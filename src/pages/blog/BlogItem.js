import Image from 'next/image'
import React from 'react'
import DefaultImage from '@/assets/images/category/default.png'
import Ripples from 'react-ripples'
import { useRouter } from 'next/router'
import CustomRipple from '@/component/Form/Button/CustomRipple'
import { ConvertTime, getFormattedDate } from '@/Utils/Utils'
import Link from 'next/link'
export default function BlogItem({ ele }) {

    const router = useRouter()
    const handleNavigate = (slug) => {
        router.push({ pathname: '/blog/' + ele?.node?.slug })
    }

    const imageUrl = ele?.node.coverImage?.url ? ele?.node.coverImage.url : DefaultImage
    const title = ele?.node.title ? ele?.node.title : 'No Title'


    return (
        <div className='group cursor-pointer border-[#D9D4E2] border-[1px] rounded-2xl shadow-xl transition delay-150 hover:text-white bg-red-200'>
            {/* <div className='bg-red-500 w-full h-full'> */}

            <Link href={"/blog/" + ele?.node?.slug}>

                <div onClick={() => handleNavigate(ele?.slug)} className='w-full'>
                    <div className='card rounded-t-2xl border-b p-2 transition delay-150 group-hover:bg-headupb2b group-hover:border-b-slate-50/30 '>
                        <div className='p-1'>
                            <Image src={imageUrl} width={1000} height={100} className='rounded-2xl t:min-h-[160px] t:max-h-[160px] ll:min-h-[170px] ll:max-h-[170px] 4k:min-h-[270px] 4k:max-h-[270px] 4k:object-cover w-full' unoptimized={true} />
                        </div>
                        <div className='p-2 rounded-2xl' style={{ minHeight: '2.5rem' }}>
                            <div className='ll:min-h-[0px] overflow-hidden'>
                                <label className='text-sm 4k:text-2xl font-semibold line-clamp- block group-hover:text-white'>{title}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col rounded-b-2xl bg-white p-2 justify-center transition delay-150 group-hover:bg-headupb2b'>
                    <div className='flex justify-between items-center px-2'>
                        <div>
                            <label className='text-sm 4k:text-2xl group-hover:text-white'>{getFormattedDate(ConvertTime(ele?.node.publishedAt), ['date', 'month', 'year'], '-', null, true)}</label>
                        </div>
                        <div>
                            <CustomRipple text={'Read more'} className='ripple cursor-pointer text-white py-2 px-4 text-sm 4k:text-2xl' onClick={() => handleNavigate(ele.node.slug)} />
                            {/* <CustomRipple text={'Read more'} className='ripple cursor-pointer text-white py-2 px-4 text-sm 4k:text-2xl' onClick={() => handleNavigate(ele.node.slug)} /> */}
                        </div>
                    </div>
                </div>

            </Link>

            {/* </div> */}
        </div>
    )
}


