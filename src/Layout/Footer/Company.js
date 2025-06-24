import Link from 'next/link'
import React from 'react'
import Support from './Support'

export default function Company() {
  const fields = [
    { _id: 0, title: 'About us', url: '/about', active: true },
    { _id: 0, title: 'Blogs', url: '/blog', active: true },
    { _id: 0, title: 'Careers', url: '/careers', active: true },
    { _id: 0, title: 'Contact us', url: '/contact', active: true },
  ]

  const handleClick = (ele) => {
    // router.push({pathname:ele?.url})
    window.location.href = ele?.url

  }

  return (
    <>
      <div className='mb-3'>
        <div className='mb-2'><label className='text-xl font-bold tracking-wide 4k:text-4xl'> Company </label></div>
        <ul>
          {fields?.map((ele, index) => <li key={index}>
            <Link href={ele?.url}>
              <label onClick={() => handleClick(ele)} class=" font-normal text-xs leading-5 cursor-pointer relative inline-block group 4k:text-2xl">{ele?.title} <span class="absolute inset-x-0 bottom-0 h-[0.2px] bg-white transform scale-x-0  group-hover:scale-x-100 transition-transform duration-300"></span></label>
            </Link>
          </li>)}
        </ul>
      </div>
      {/* <Support /> */}
    </>
  )
}
