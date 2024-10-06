/* eslint-disable no-unused-vars */
import React from 'react'
import Hero from '../../Components/2HomeContent/1Hero/Hero'
import FeaturedArt from '../../Components/2HomeContent/3FeaturedArt/FeaturedArt'
import MonadSpotlight from '../../Components/2HomeContent/4MonadSpotlight/MonadSpotlight'
import Member from '../../Components/2HomeContent/5CommunityMembers/Member'
import Review from '../../Components/2HomeContent/6Review/Review.jsx'

const Home = () => {
  return (
    <div>
      <Hero/>
      <FeaturedArt/>
      <MonadSpotlight/>
      <Member/>
      <Review/>
    </div>
  )
}

export default Home
