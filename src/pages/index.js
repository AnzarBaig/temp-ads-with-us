'use client';
import WhatAreYouLookingFor from '@/component/CTA/WhatAreYouLookingFor'
import MainCategory from '@/component/Category/MainCategory'
import HeroHome from '@/component/Hero/Home/HeroHome'
import QualityAspect from '@/component/QualityAspect/QualityAspect'
import ClientPartnerSwitch from '@/component/Switch/ClientPartner/ClientPartnerSwitch'
import React, { useEffect, useState } from 'react'
import Blog from './blog'
import FAQs from '@/component/FAQ/FAQs'
import FAQDataProps from '@/Contants/FAQScript/FAQData'

import CallAndChat from '@/component/CTA/CallAndChat'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { GraphQLClient, gql } from 'graphql-request';
import CustomSearch from '@/component/Form/Search/CustomSearch'
import LogoDark from '@/assets/images/logo-dark.jpg'
import Image from 'next/image'
import BlurFade from '@/components/ui/blur-fade'
import RetroGrid from '@/components/magicui/retro-grid'
import FAQSchema from '@/schemas/faqSchema'
import query from '@/Query/indexQuery'
import indexSchema from '@/schemas/indexSchema'
import { useRouter } from 'next/router';

const endpoint = 'https://gql.hashnode.com';


export default function index({ data, initialDataa }) {
  const canonical = "https://www.headsupb2b.com/";

  const router = useRouter();

  const handleNavigate = () => {
    router.push('/404'); // Navigate to About page
  };


  // useEffect(() => {
  //   if (initialDataa !== 0) {
  //     router.push('/404'); // Or your desired route
  //   }
  // }, [initialDataa]);

  function schema() {
    return {
      __html: indexSchema
    }
  }

  {console.log("initialdata----->",initialDataa);
  }

  return (
    <div>
      <Head>
        <script
          strategy="lazyOnload"
          type="application/ld+json"
          dangerouslySetInnerHTML={schema()}
          key="product-jsonld"
        />
        <script
          strategy="lazyOnload"
          type="application/ld+json"
          dangerouslySetInnerHTML={FAQSchema()}
          key="FAQ"
        />
      </Head>
      <NextSeo
        title="Building Construction Raw Material Supplier In Delhi"
        description="Building Construction Raw Material supplier in Delhi NCR - Headsup B2B is best place to buy building materials, bricks, aggregate, stone dust, jamuna sand, concrete, steel, tiles in Delhi NCR."
        keywords={`building material suppliers in delhincr, order building materials online, building materials online Delhi, yamuna sand buy online, yamuna sand supplier, bricks buy online in delhi ncr, building material suppliers near me, buy aggregate online, aggregate supplier in delhi,s tone aggregate buy online, aggregate wholesaler delhincr, stone dust supplier in delhi, red bricks supplier in delhi, yamuna sand supplier delhi,`}
        canonical={canonical}
      />
      <div className='relative'>
      </div>
      <div className='flex flex-col items-center justify-center w-full h-full mt-32 space-y-8'>

        <RetroGrid />
        <Image src={LogoDark} className='w-[300px] 4k:w-[350px]' />
        <div className='w-full flex items-center justify-center'>
          <CustomSearch />
        </div>
      </div>
      <div className='mt-16'><HeroHome initialData={initialDataa} /></div>
      <div className='ms:mx-6 t:mx-20 l:mx-20 ll:mx-28 imac:px-44  4k:px-56'>
        <div className='pt-20  4k:pt-40 relative'><MainCategory initialDataa={initialDataa} /></div>
        <div className='pt-20  4k:pt-40'><ClientPartnerSwitch /></div>
        <div id='WhatAreYouLookingFor' className='pt-20  4k:pt-40 '><WhatAreYouLookingFor /></div>
        <div className='pt-20  4k:pt-40'><Blog from={'home'} blogData={data?.publication?.posts?.edges} /></div>
        <div className='py-10 4k:py-40'><CallAndChat /></div>

        <div className='ml:h-[400px] ll:h-[400px] overylay-image flex items-center mt-8' >
          <div className="flex flex-col space-y-4">
            <h1 className='text-white w-full text-center text-4xl ms:font-bold ms:text-4xl l:font-bold py-4'>Building & Construction Materials Online in Delhi/NCR
            </h1>
            <div className='text-center ms:p-4 ml:p-1 ms:px-2 t:px-8 l:px-48'>
              <p className='text-white ll:text-xl ms:text-md font-normal'>We supply complete building and construction materials like TMT Steel, Bricks & Blocks, Aggregates, Sand, Tiles, Sanitary and Bathware Fittings, Electrical Materials, Plumbing Materials, Safety Products, Material Handling Equipment, Renewable Energy, Fitness Equipment  etc. at wholesale prices across In Delhi/NCR.</p>
            </div>
          </div>
        </div>
       {/* { console.log("BuySellNow", BuySellNow)} */}
        
        <div className='py-14 4k:py-40'><FAQs FAQData={FAQDataProps} /></div>
      </div>
    </div>
  )
}



export async function getStaticProps() {

  const initialData = await fetch('https://api.headsupb2b.com/api/getCategoryData').then(res => res.json());

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: 'Bearer YOUR_AUTH_TOKEN', // If you need to pass any headers like authorization
    },
  });



  // Define the variables for the query
  const variables = {
    host: 'headsupb2b.hashnode.dev',
    first: 20,
    after: null, // or you can specify a cursor for pagination
  };

  // Fetch data from the GraphQL API
  let data;
  try {
    data = await client.request(query, variables);
  } catch (error) {
    console.error('Error fetching data:', error);
    data = null;
  }

  return {
    props: {
      data,
      initialDataa: initialData,
    },
    revalidate: 3600,
  };
}