import React from 'react';
import { useRouter } from 'next/router';
import SEO from '@/Contants/SEO/SEO';
import SubCategory from '@/component/Category/SubCategory/SubCategory';
import WhatAreYouLookingFor from '@/component/CTA/WhatAreYouLookingFor';
import Blog from '../blog';
import FAQs from '@/component/FAQ/FAQs';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import FAQData from '@/Contants/FAQScript/FAQscriptForCategory';
import request from 'graphql-request';
import { SearchPostsOfPublicationDocument } from '@/generated/graphql';
import LoadingSpinner from '@/component/Loader/LoadingSpinner';

const endpoint = 'https://gql.hashnode.com';

export default function CategoryPage({ contentForSeo, categoryData, dataOfFilterPost, canonicalUrl }) {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingSpinner />;
  }

  function FAQSchema() {
    const faqDataAccordingToSlug = FAQData[categoryData.url];
    return { __html: faqDataAccordingToSlug }
  }

  const imageURL = categoryData?.imageUrl;

  return (
    <div>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={FAQSchema()}
          key="FAQ"
        />
      </Head>
        <NextSeo
        title={categoryData?.metaName ? categoryData.metaName : categoryData?.categoryName}
        description={
          categoryData?.metaDescription
            ? categoryData.metaDescription
            : categoryData?.description?.slice(0, 160)
        }
        canonical={canonicalUrl}
      />


      <div className='ms:mt-12 t:mt-0'>
        <div className='ms:mx-6 t:mx-20 l:mx-20 ll:mx-28 imac:px-44 4k:px-56'>
          <h1 className='text-black mt-8 text-center text-4xl ms:font-bold ms:text-4xl l:font-bold py-4'>{categoryData?.categoryName}</h1>
          <label className='text-black/50 ll:text-sm ms:text-md font-normal text-center inline-block'>{categoryData?.description}</label>
          <div className='ms:mt-10 t:mt-10'><SubCategory data={categoryData} /></div>
          <div className='ml:h-[400px] ll:h-[400px] qhd:h-[570px] overylay-image flex items-center mt-8' style={{ backgroundImage: `url('${imageURL}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'multiply', opacity: 0.95 }}>
            <div className="flex flex-col space-y-4">
              <h2 className='text-white w-full text-center text-4xl ms:font-bold ms:text-4xl l:font-bold py-4'>{categoryData?.name2}</h2>
              <div className='text-center ms:p-4 ml:p-1 ms:px-2 t:px-8 l:px-48'>
                <label className='text-white ll:text-xl ms:text-md font-normal'>{categoryData?.secondDescription}</label>
              </div>
            </div>
          </div>
          <div className='ms:mt-10 t:mt-20'><WhatAreYouLookingFor /></div>
          <div className='ms:mt-10 t:mt-20'><Blog from='page' blogData={dataOfFilterPost} /></div>
          <div className='ms:py-10 t:py-14'><FAQs FAQData={categoryData?.FAQs} /></div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { category } = params;

  console.log("category---", category);

  let dataOfFilterPost;
  try {
    const data = await request(endpoint, SearchPostsOfPublicationDocument, {
      first: 5,
      filter: { 
        query: category === "medical-equipment" ? "medical" : category, 
        publicationId: "6641bd538c27052a2f463366" 
      },
    });
    dataOfFilterPost = data.searchPostsOfPublication;
  } catch (error) {
    console.error("Error fetching data:", error);
    dataOfFilterPost = null;
  }

  // Get SEO content
  const seoContent = SEO?.doc?.find(obj => obj?.url === category) || null;

  // Fetch all category data
  const allCategoryData = await fetch('https://api.headsupb2b.com/api/getCategoryData').then(res => res.json());
  const categoryData = allCategoryData?.find(obj => obj?.url === category);

  // If no category data found, return 404
  if (!categoryData) {
    return {
      notFound: true,
    };
  }

  const canonicalUrl = `https://www.headsupb2b.com/${category}`;

  return {
    props: {
      categoryData,
      contentForSeo: seoContent,
      dataOfFilterPost,
      canonicalUrl,
    },
    revalidate: 3600//86400,  Re-generate page every day
  };
}

export async function getStaticPaths() {
  // Fetch all categories
  const res = await fetch("https://api.headsupb2b.com/api/getCategoryData");
  const allCategories = await res.json();

  const paths = allCategories.map(category => ({
    params: { category: category.url },
  }));

  return {
    paths,
    fallback: "blocking", // Generates pages on demand if not pre-built
  };
}
