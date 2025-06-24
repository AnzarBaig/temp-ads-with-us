import React from 'react'
import { Response } from './response'
import Item from './Item';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

export default function Client() {
    const client = Response?.doc?.[0]?.client
    return (
        
        <Marquee pauseOnHover={true} speed={80} >
            {client.map((ele, index) => (
                <Image height={100} width={100} src={ele.imageUrl.src} alt="Client brand Picture" className='h-32 w-32 object-scale-down m-4 mx-6' />
            ))}

        </Marquee>
    )
}
