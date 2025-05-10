import React from 'react'
import Title from "../Title/title";
import TimelineWithAnimation from '../TImeline/timeline'
import AchievementsPage from "../Achievement/achievement";
import LatestVideos from "../latestvideos/LatestVideos";
import { HeroHighlight,Highlight } from '../components/ui/hero-highlight';
import { HeroParallax } from '../components/ui/hero-parallax';
import { products } from '../Hero/Hero';
function HomeSection() {
  return (
    <>
     {/* <HeroHighlight containerClassName="h-screen" className="text-center px-4">
      <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
        Welcome to <br /> <Highlight>Alpha Gaming Regiment (AGR)</Highlight>
      </h1>
   
    </HeroHighlight> */}
       <HeroParallax products={products} />
       <Title mainTitle="our" subTitle="journey"/>
       <TimelineWithAnimation/>
       <Title mainTitle="our" subTitle="achievements"/>
       <AchievementsPage/>
       <Title mainTitle="Latest" subTitle="Videos"/>
       <LatestVideos />
    </>
  )
}

export default HomeSection