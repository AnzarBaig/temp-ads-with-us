import HeaderTitle from '@/component/Header/HeaderTitle'
import SubHeader from '@/component/Header/SubHeader'
import { Language } from '@/locales/Language'
import { getLanguage } from '@/storage/storage'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import { GradientText } from '@/Contants/constant'
import { gql, useQuery } from '@apollo/client'
import { AllPost } from '@/Query/AllPostQuery'
import data from './response.json'
import CustomRipple from '@/component/Form/Button/CustomRipple'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

function Blog({ data, from }) {

    let dataofBlog = data.edges ? data.edges : data


    let td = []
    dataofBlog?.forEach((ele, index) => {
        if (index < 3) {
            td?.push(ele)
        }
    });
    let item = td?.map((ele, index) => { return <div className='my-2'><BlogItem key={index} ele={ele} /></div> })
    return item;

    // if (from === 'home') {
    //     let td = []
    //     data?.forEach((ele, index) => {
    //         if (index < 3) {
    //             td?.push(ele)
    //         }
    //     });
    //     let item = td?.map((ele, index) => { return <div className='my-2'><BlogItem key={index} ele={ele} /></div> })
    //     return item;
    // } else {
    //     let td = []
    //     data?.forEach((ele, index) => {
    //         td?.push(ele)
    //     });
    //     let item = td?.map((ele, index) => { return <div className='my-2'><BlogItem key={index} ele={ele} /></div> })
    //     return item;
    // }

    // return null
}

export default function index({ blogData }) {
    let from = 'home'

    const router = useRouter()


    let data = blogData
    const [currentLanguage, setCurrentLanguage] = useState(null)
    const [dynamicCanonicalUrl, setDynamicCanonicalUrl] = useState("");

    useEffect(() => {
        if (currentLanguage === null) {
            let cl = getLanguage()
            if (cl === undefined || cl === null) {
                setCurrentLanguage('en')
            } else {
                setCurrentLanguage(cl)
            }
        }
        if (typeof window !== "undefined") {
            const dynamicUrl = window.location.href;
            setDynamicCanonicalUrl(dynamicUrl);
        }

    }, [])

    const handleNavigate = () => {
        router.push({ pathname: '/blog' })
        // window.location.href = '/blog'
    }
    const IconComponent = ({ title, className }) => {
        return <div className='flex flex-col items-center'>
            <span className={`my-1 ${className} text-4xl`}></span>
            <label className='text-md tracking-wider '>{title}</label>
        </div>
    }

    return (
        <div className={`${from !== 'blog' ? '' : 'ms:mx-6 t:mx-20 ms:py-20 t:py-12 l:mx-20 ll:mx-28 imac:px-44 4k:px-56'}`}>
            {from === 'blog' ? <NextSeo
                title='Blog-Building Construction Material Supplier In Delhi NCR | Headsup B2B'
                canonical={dynamicCanonicalUrl}
            /> : null}
            <div className='mb-4'>
                <div className='text-center'>
                    <h3 className={`${GradientText} inline-block text-transparent bg-clip-text font-bold text-3xl 4k:text-6xl`}>{Language?.[currentLanguage]?.Blogs}</h3>
                </div>
                <div className='text-center'><SubHeader text={Language?.[currentLanguage]?.BlogSubTitle} /></div>
            </div>
            {data ? <div className="grid mm:grid-cols-1 t:grid-cols-2 l:grid-cols-3 imac:grid-cols-4 4k:grid-cols-4 gap-4"><Blog data={data} from={from} /></div> : null}
            {
                from === 'blog' ? null : <div className='flex justify-center'>
                    <label className='group cursor-pointer text-headupb2b font-medium py-2 px-4 text-md 4k:text-3xl flex items-center hover:scale-x-105  transaction-delay' onClick={() => handleNavigate()}>View All&nbsp;<div><IconComponent className={'icon-left-arrow rotate-180 text-[18px] 4k:text-3xl'} /></div> </label>
                </div>
            }
        </div>
    )
}
