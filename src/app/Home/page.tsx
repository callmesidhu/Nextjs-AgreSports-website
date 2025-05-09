import React from 'react'
import HeroSection from "../Hero/Hero";
import Title from "../Title/title";
import TimelineWithAnimation from '../TImeline/timeline'
import AchievementsPage from "../Achievement/achievement";
import LatestVideos from "../latestvideos/LatestVideos";
import ManagementPage from '../Management/page';

function HomeSection() {
  return (
    <>
       <HeroSection />
       <Title mainTitle="our" subTitle="journey"/>
       <TimelineWithAnimation/>
       <Title mainTitle="our" subTitle="achievements"/>
       <AchievementsPage/>
       <section id="management">
        <ManagementPage />
      </section>
       <Title mainTitle="suggestion" subTitle="Videos"/>
       <LatestVideos />
    </>
  )
}

export default HomeSection