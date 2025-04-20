import HeroSection from "./Hero/Hero";
import Title from "./Title/title";
import Header from "./Header/header";
import TimelineWithAnimation from './TImeline/timeline'
import ManagementTeam from './Management/page'
import Footer from './Footer/footer'
import { metalMania } from "./fonts/metalMania";
import AchievementsPage from "./Achievement/achievement";
import LatestVideos from "./latestvideos/LatestVideos";
import Lineup from "./Team/page";

export default function Home() {
  return (
   
    <div className={`text-xl`}>  
       <HeroSection />

       <Title mainTitle="our" subTitle="journey"/>
       <TimelineWithAnimation/>
       <Title mainTitle="our" subTitle="achievements"/>
       <AchievementsPage/>
       <Title mainTitle="Latest" subTitle="Videos"/>
       <LatestVideos />
       {/* 
       <ManagementTeam/>
       <Lineup/> 
       */}
    </div>
  );
}
