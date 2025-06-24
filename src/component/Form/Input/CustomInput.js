import React from 'react'

export default function CustomInput({ type, placeholder, className, important, style, showHeader, value, onChange, name, required }) {
  return (
    <div className='flex flex-col'>
      {showHeader?<span className='text-sm font-medium 4k:text-2xl'>{placeholder}{important?<span className='text-red-500'>*</span>:null}</span>:null}
      <input type={type || 'text'} placeholder={placeholder} className={className} style={style}/>
    </div>
  )
}
