import Image from 'next/image'
import React from 'react'

export default function Banner({ imgUrl, title, description}) {
  return (
    <div className='ms:h-[300px] t:h-[400px] overylay-image flex items-center border' style={{ backgroundImage: `url(${imgUrl?.src})`, }}>
    <div className='text-center mm:p-4 ml:p-1 mm:px-4 l:px-48 w-full'>
    <h1 className={`text-white ms:text-2xl t:text-3xl  ll:text-4xl 4k:text-8xl mm:font-bold l:font-medium py-2`}>{title}</h1>
      <label className='text-white ms:text-2xl t:text-3xl  ll:text-4xl 4k:text-5xl text-center ' >{description}</label>
    </div>
  </div>
  )
}
