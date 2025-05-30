import React from 'react'
import Title from "../Title/title";
import TimelineWithAnimation from '../TImeline/timeline'
import AchievementsPage from "../About/Achievement/achievement";
import LatestVideos from "../latestvideos/LatestVideos";
import ManagementPage from '../Management/page';
import About from '../About/page';
import Header from '../Header/header';
import HeroSection from '../Hero/Hero';
import Extra from '../components/ui/extra';

function HomeSection() {

  return (
    <>
    <Header />
       <HeroSection />
    
       <Title mainTitle="our" subTitle="journey"/>
       <TimelineWithAnimation/>
       <section id="about">
        <About />
      </section>
       <Title mainTitle="our" subTitle="achievements"/>
       <AchievementsPage/>
       <section id="management">
        <ManagementPage />
      </section>
      <Title mainTitle="LAN" subTitle="Tournaments & Sponsorships"/>
      <Extra />
       <Title mainTitle="suggestion" subTitle="Videos"/>
       <LatestVideos />
    </>
  )
}

export default HomeSection