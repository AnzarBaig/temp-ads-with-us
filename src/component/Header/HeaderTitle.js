import React from 'react'

export default function HeaderTitle({ text, type, className }) {
  return (
    <>
      {type ? <h1 className={`font-bold mm:text-3xl ${className}`}>{text}</h1> : <label className={` ${className} font-bold mm:text-xl`}>{text}</label>}
    </>

  )
}
