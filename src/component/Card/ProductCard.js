import React from 'react'
import DefaultImage from '@/assets/images/category/default.png'
import Image from 'next/image'
import { Gradient } from '@/Contants/constant'
import Ripples from 'react-ripples'
import { useRouter } from 'next/router'
import CustomRipple from '../Form/Button/CustomRipple'
import Link from 'next/link'


export default function ProductCard({ ele, index }) {
  const router = useRouter()
  const handleNavigate = (ele) => {
    router.push({ pathname: ele?.url })
  }

  const GetSubJHEad = () => {
    return (ele?.subCategory?.slice(0, 2)?.map(inerEle => <span>{inerEle?.categoryName}</span>) || []).map((span, index, array) => (
      <React.Fragment key={index}>
        {span}
        {index !== array.length - 1 && " | "}
      </React.Fragment>
    ))
      .concat(ele?.subCategory?.length > 2 ? <span key="etc"> etc.</span> : [])
  }

  return (
    <Link href={ele?.url} prefetch={true}>
      <div className='flex space-y-2 group cursor-pointer card product-card ml:rounded-2xl ms:rounded-2xl ms:text-center l:text-left l:min-h-[305px] 4k:min-h-[450px] ll:min-h-[310px] hover:bg-headupb2b transaction-delay hover:text-white ' onClick={() => handleNavigate(ele)}>
        <div className=''><Image src={ele?.imageUrl} width={328} height={136} alt={ele?.categoryName} priority={true} className='cursor-pointer ms:rounded-3xl ms:p-3 ms:min-h-[250px] ms:max-h-[250px]  t:min-h-[160px] t:max-h-[160px]  4k:min-h-[260px] 4k::max-h-[260px]' style={{ width: '100%', objectFit: 'cover' }} unoptimized={true} /></div>
        <div className='ms:px-3 ms:pb-3'>
          <div className={` l:mt-[-10px] 4k:mt-0`} ><label className='cursor-pointer font-bold ms:text-xl l:text-[16px] 4k:text-3xl'>{ele?.displayName || ele?.categoryName}</label></div>
          <div className={` l:mt-[-6px] 4k:mt-0`} ><label className='ms:text-[14px] l:text-[12.5px] 4k:text-xl'>{GetSubJHEad()}</label></div>
          <div className='l:absolute l:bottom-4 l:mt-[-10px] 4k:mt-0 4k:bottom-4'>
            <CustomRipple text={'View All'} className={'ripple cursor-pointer ms:mt-3 ms:text-[16px] ms:px-6 ms:py-2.5 l:px-4 l:py-2 '} onClick={() => handleNavigate(ele)} />
          </div>
        </div>
      </div>
    </Link >
  )
}

{/* <div class="child cursor-pointer ms:rounded-3xl ms:p-3 ms:min-h-[250px] ms:max-h-[250px] l:min-h-[160px] l:max-h-[160px]" style={{ backgroundImage: `url(${ele?.imageUrl?.src})`,  width: '100%', objectFit : 'cover' }}></div> */ }