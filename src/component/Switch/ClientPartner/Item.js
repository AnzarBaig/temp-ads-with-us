import Image from 'next/image'
import React from 'react'

export default function Item({ ele, delay }) {

  return (
    // <div className=' flex items-center justify-center ms:min-h-24 ml:min-h-32 t:min-h-36 l:min-h-40 ll:min-h-32 animate__animated animate__fadeInUp' style={{ animationDelay : `${delay}s`}}>
    <Image src={ele?.imageUrl} />
    // </div>
  )
}
