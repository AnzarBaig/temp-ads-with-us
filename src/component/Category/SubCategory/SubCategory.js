import React, { useEffect, useState, useRef } from 'react'
import Item from './Item'
import { GradientText } from '@/Contants/constant'
import { Language } from '@/locales/Language'
import { getLanguage } from '@/storage/storage'


// Image import
// import SAIL from '@/assets/brands/SAIL.png'
// import JSW from '@/assets/brands/JSW.png'
// import JSPL from '@/assets/brands/JSPL.png'
// import TATA from '@/assets/brands/TATA.png'
// import ELECTROSTEEL from '@/assets/brands/ELECTRO STEEL.png'
// import JINDALSTEEL from '@/assets/brands/JINDAL STEEL.png'
// import RINL from '@/assets/brands/RINL.jpeg'
// import Atul from '@/assets/brands/Atul.png'
// import BEC from '@/assets/brands/BEC.jpeg'
// import Havells from '@/assets/brands/Havells.png'
// import Jindal from '@/assets/brands/Jindal.jpg'
import Image from 'next/image'
import { useRouter } from 'next/router'


export default function SubCategory({ data }) {
    const [selected, setSelected] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [currentLanguage, setCurrentLanguage] = useState(null)
    const [selectedBrand, setSelectedBrand] = useState(null)
    const resultRef = useRef(null);


    return (
        <div className=''>
            <div className='grid gap-3 t:gap-5 grid-cols-1 ms:grid-cols-1 ml:grid-cols-1 t:grid-cols-2 l:grid-cols-3 ll:grid-cols-4' >
                {
                    data?.subCategory?.map((ele, index) => <div key={index} className=''>
                        <Item ele={ele} data={data} selected={selected} setSelected={setSelected} keyName={'categoryName'} showSelected={true} resultRef={resultRef} />
                    </div>)
                }
            </div>
            {/* <div id='#products' className='my-10' >
                {selected?.products?.length ? <div className='text-center'>
                    <h1 className={`${GradientText} inline-block text-transparent bg-clip-text font-bold text-3xl`}>{Language?.[currentLanguage]?.Products}</h1>
                </div> : null}
                <div className='my-8 grid gap-3 t:gap-5 grid-cols-1 ms:grid-cols-1 ml:grid-cols-1 t:grid-cols-2 l:grid-cols-3 ll:grid-cols-4'>
                    {
                        selected?.products?.map((ele, index) => <div key={index} className=''>
                            <Item ele={ele} data={data} selected={selectedProduct} setSelected={setSelectedProduct} keyName={'name'} showSelected={true} />
                        </div>)
                    }
                </div>
            </div> */}
            {/* <div id='#brands' className='my-10'>
                {selected?.brands.length ? <div className='text-center'>
                    <h1 className={`${GradientText} inline-block text-transparent bg-clip-text font-bold text-3xl`}>{Language?.[currentLanguage]?.Brands}</h1>
                </div> : null}
                <div className='my-6'>
                    <div className='flex t:justify-center flex-wrap ms:space-y-3 space-x-8'>
                        {
                            selected?.brands?.map((ele, index) => <div key={index} className='text-center'>
                                <Image src={ele} width={100} height={100} className='ms:aspect-[1/1] t:aspect-[3/2] l:aspect-[2/2] object-contain ' />
                            </div>)
                        }
                    </div>
                </div>

            </div> */}
        </div>
    )
}
