import React from 'react'
import HeroSection from './HeroSection'
import MetricsCards from './MetricsCards'
import FeaturesGrid from './FeaturesGrid'
import StatsBanner from './StatsBanner'
import MediaKitCTA from './MediaKitCTA'
import NewCTASection from './NewCTASection'


function index() {

  


  return (
    <main className="bg-gray-50 mb-10 p-10 ">
      <HeroSection />
      <MetricsCards />
      <StatsBanner />
      <FeaturesGrid />
      <MediaKitCTA />
      <NewCTASection/>

    </main>
  )
}

export default index