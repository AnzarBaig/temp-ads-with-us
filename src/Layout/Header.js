import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LogoDark from '@/assets/images/logo-dark.jpg'

import Link from 'next/link'
import Navigation from '@/Navigation/Navigation'
import BottomNavigation from '@/Navigation/BottomNavigation'

export default function Header({ home }) {
  const [isMounted, setIsMounted] = useState(false)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    // Set initial width
    handleResize()

    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Mark as mounted
    setIsMounted(true)

    // Cleanup listener
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <div className='pb-100'>
      {width > 800 ? <Navigation /> : <BottomNavigation />}
    </div>
  )
}