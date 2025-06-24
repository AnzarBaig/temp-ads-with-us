

import { useRouter } from 'next/router'
import { FaDrumSteelpan } from "react-icons/fa";
import CarouselSpacing from '@/component/Carousel/CarouselSpacing';
import { useState } from 'react';

export default function HeroHome({ initialData }) {
  const router = useRouter()

  function filterCategories(initialData) {
    const excludedCategories = [
      'IT Products',
      'Tools and Accessories',
      'Fitness Equipment'
    ];

    const filteredData = initialData?.filter(item => {
      return !excludedCategories.includes(item.categoryName);
    });
    //console.log("filterData------>",filteredData)   first press i > merge rebase > tap esc > :wq! (save) > then enter ,,,,,,, if no save operation > :q!
    return filteredData;
  }

  const heroPost = filterCategories(initialData);


  let Data = [
    { _id: 1, categoryName: 'Road Safety Equipments', url: 'road-safety-equipment', imageUrl: "https://www.headsupb2b.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fheadsupb2b-v2.appspot.com%2Fo%2Fcategory%252F1716546416402jpgroad-safety-equipments.jpg%3Falt%3Dmedia%26token%3Da290a7e8-95fc-4b81-ad93-57b8271b04d4&w=750&q=75" },
    { _id: 2, categoryName: 'Construction Material', url: 'construction-materials', imageUrl: "https://www.headsupb2b.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fheadsupb2b-v2.appspot.com%2Fo%2Fcategory%252F1716546454226jpgconstruction-materials.jpg%3Falt%3Dmedia%26token%3D56ff6ff3-f23a-49d5-ad55-7fc7e2cf9dfd&w=750&q=75" },
    { _id: 3, categoryName: 'Electrical', url: 'electricals', imageUrl: "https://www.headsupb2b.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fheadsupb2b-v2.appspot.com%2Fo%2Fcategory%252F1716546683300jpgelectricals.jpg%3Falt%3Dmedia%26token%3Dbbd484d7-177f-4cf2-8619-9df2420a0e14&w=750&q=75" },
    { _id: 4, categoryName: 'Medical Equipment', url: 'medical-equipment', imageUrl: "https://www.headsupb2b.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fheadsupb2b-v2.appspot.com%2Fo%2Fcategory%252F1716546683300jpgelectricals.jpg%3Falt%3Dmedia%26token%3Dbbd484d7-177f-4cf2-8619-9df2420a0e14&w=750&q=75" },

  ]

  const handleNavigate = (url) => {
    router.push({ pathname: url })
  }

  const Item = ({ ele }) => {
    return (
      <>
        <div
          onClick={() => handleNavigate(ele?.url)}
          className={`flex justify-center items-center overylay-image hover:shadow-2xl text-center border transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-white t:text-[11px] ll:text-base 4k:text-3xl
            t:p-1.5 l:p-2.5 4k:p-6 l:font-medium transaction-delay ${active === ele?.categoryName
              ? 'bg-headupb2b text-white border-headupb2b'
              : 'border-white'
            } hover:bg-purple hover:border-headupb2b hover:text-white focus:bg-headupb2b`}
          style={{
            backgroundImage: `url('${ele?.imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply',
            opacity: 0.95,
          }}
        >
          {ele?.categoryName}
        </div>
        <style jsx>{`
          div:hover {
            z-index: 1;
          }
        `}</style>
      </>
    );
  };


  return (
    <div className='relative'>
      {/* <div className='hero-image ms:h-[300px] ll:h-[600px]'></div>
      <div className='absolute top-12 ms:hidden t:block w-full'> */}
      {/* <div className='relative grid t:grid-cols-5 t:mx-10 l:mx-18 ll:mx-36 rounded-xl h-28 imac:mx-56 bg-purple cursor-pointer'>
        {Data?.map((ele, index) => <Item ele={ele} key={index} />)}
      </div> */}

      <div className=" ">
        <CarouselSpacing initialData={heroPost} />
      </div>
      {/* </div> */}
    </div>
  )
}
