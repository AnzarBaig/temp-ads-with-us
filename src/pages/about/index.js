import HeaderTitle from '@/component/Header/HeaderTitle'
import Banner from '@/component/Hero/Banner'
import { Language } from '@/locales/Language'
import { getLanguage } from '@/storage/storage'
import React, { useEffect, useState } from 'react'
import BannerImg from '@/assets/images/about1.jpg'
import { Gradient, GradientText } from '@/Contants/constant'
import { NextSeo } from 'next-seo'
import { Button } from '@/components/ui/button'
import { ArrowRightCircle } from 'lucide-react'
export default function index() {
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

  const dynamicCanonicalUrl = `https://www.headsupb2b.com/about`

  return (
    <div className='ms:mt-12 t:mt-0'>
      <NextSeo
        title='Know About Headsup B2B Construction and Electrical Products and Services'
        description='Know About Headsup B2B Construction and Electrical Products and Services'
        canonical={dynamicCanonicalUrl}
      />
      <div><Banner imgUrl={BannerImg} height={400} title={`Your Business, Our Passion:`} description={`Exploring the Essence of Headsup B2B`} /></div>
      <div className='ms:mx-6 ms:pb-6 t:mx-20 t:pb-10 l:mx-20 l:pb-10 ll:mx-28 imac:px-44 4k:px-56'>
        <label className="flex justify-center mt-8"> <h1 className={`${GradientText} inline-block text-transparent bg-clip-text font-bold text-3xl 4k:text-6xl`}>{Language?.[currentLanguage]?.About}</h1></label>
        <div className='py-6 ms:text-justify t:text-center 4k:text-3xl'>
          Established in 2021, Headsup B2B has rapidly grown into a leading supplier of industry essentials that offers comprehensive services to various sectors in the country. Our wide range of product portfolio consists of robust steel products, innovative renewable energy solutions, construction supplies, and much more. With a vision of simplifying procurement processes for everyone, we uphold unwavering standards of quality, reliability, and affordability in every aspect of our service. Whether you need premium TMT bars or advanced solar panels, our committed team ensures prompt and efficient delivery. Experience seamless procurement with Headsup B2B today!
        </div>


      </div>
    </div >

  )
}
