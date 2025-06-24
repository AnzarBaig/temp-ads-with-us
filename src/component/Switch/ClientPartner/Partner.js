import React from 'react';
import { Response } from './response';
import Item from './Item';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

export default function Partner() {


    const partners = Response?.doc?.[0]?.partner;
    const midpoint = Math.ceil(partners.length / 2);


    const firstRow = partners.slice(0, midpoint);
    const secondRow = partners.slice(midpoint);

    return (
        <>
            <Marquee pauseOnHover={true} speed={80} >
                {firstRow.map((ele, index) => (
                    ele.imageUrl && <Image height={ele.height ? ele.height : 100} width={ele.width ? ele.width : 100} key={index} src={ele?.imageUrl.src} alt="Brand picture" className='h-32 w-32 object-scale-down m-4 mx-6' />
                ))}
            </Marquee>
            <Marquee pauseOnHover={true} speed={80}>
                {secondRow.map((ele, index) => (
                    ele.imageUrl && ele.imageUrl.src && <Image height={ele.height ? ele.height : 100} width={ele.width ? ele.width : 100} key={index} src={ele?.imageUrl.src} alt="Brand Picture" className='h-32 w-32 object-scale-down m-4 mx-6' />
                ))}
            </Marquee>
        </>
    );
}
