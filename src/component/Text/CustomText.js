import React from 'react'

export default function CustomText({text, className, style}) {
  return (
    <label className={className} style={style}>{text}</label>
  )
}
