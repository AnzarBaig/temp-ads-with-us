import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo';
// import ele from './response.json'
import { GradientText } from '@/Contants/constant';
import WriterInfo from '@/component/Info/WriterInfo';

import ReactHtmlParser from 'react-html-parser'

function Query(id) {

  let qq = gql`
    {
       post(id: "${id}", idType: SLUG) {
          __typename
          id
          title
          categories {
              edges {
                node {
                  id
                    name
                }
              }
            }
            author {
              node {
                id
                name
              }
            }
            
          content
          date
          slug
          uri
          status
          featuredImageId
          featuredImageDatabaseId
          featuredImage {
            node {
              id
              sourceUrl
              altText
            }
          }
          
       }
     }
    `;
  return qq
}

function SingleBlog({ id }) {

  if (id) {
    const { data, loading, error } = useQuery(Query(id));
    let ele = data?.post
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Error: {error.message}</p>;
    }


    return <div>
      <div>
        <div className='my-4 ll:max-w-[700px]'><h1 className={`inline-block bg-clip-text font-bold ll:text-[2.5em] ll:leading-tight `}>{ele?.title}</h1></div>
        <div className='my-4'><WriterInfo data={ele} /></div>
        <div className='my-6'><Image src={ele?.featuredImage?.node?.sourceUrl} width={1000} height={100} className='rounded-xl' /></div>
        <div className='my-6'>
          <div dangerouslySetInnerHTML={{ __html: `${ele?.content}` }}></div>
        </div>
      </div>

    </div>
  }
}

export default function index() {
  const router = useRouter()
  const { id } = router?.query
  const [dynamicCanonicalUrl, setDynamicCanonicalUrl] = useState("");
  useEffect(() => {

  }, [router])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dynamicUrl = window.location.href;
      setDynamicCanonicalUrl(dynamicUrl);
    }
  }, []);

  return (
    <main className='ll:mx-32 py-10 '>
      <NextSeo canonical={dynamicCanonicalUrl} />
      <div className='grid ll:grid-cols-4 gap-4'>
        <div className='col-span-3'> {id ? <SingleBlog id={id} /> : 'loading...'}</div>
        {/* <div className='col-span-1'>loading...</div> */}
      </div>
    </main>
  )
}
