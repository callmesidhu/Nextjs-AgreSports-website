import React from 'react'
import HeroSection from "../Hero/Hero";
import Title from "../Title/title";
import TimelineWithAnimation from '../TImeline/timeline'
import AchievementsPage from "../Achievement/achievement";
import LatestVideos from "../latestvideos/LatestVideos";

function HomeSection() {
  return (
    <>
       <HeroSection />
       <Title mainTitle="our" subTitle="journey"/>
       <TimelineWithAnimation/>
       <Title mainTitle="our" subTitle="achievements"/>
       <AchievementsPage/>
       <Title mainTitle="suggestion" subTitle="Videos"/>
       <LatestVideos />
    </>
  )
}

export default HomeSection