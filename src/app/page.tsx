import HeroSection from "./Hero/Hero";
import Title from "./Title/title";
import Header from "./Header/header";
import About from "./Achievement/achievements";
import TimelineWithAnimation from './TImeline/timeline'
import ManagementTeam from './Management/management'
import Footer from './Footer/footer'
import { metalMania } from "./fonts/metalMania";
import AchievementsPage from "./Achievement/achievement";
import LatestVideos from "./latestvideos/LatestVideos";

export default function Home() {
  return (
   
    <div className={`text-xl`}>  
   
       <Header/>
       <HeroSection />
       <Title mainTitle="our" subTitle="achievements"/>
       {/* <About/> */}
       <AchievementsPage/>
       <Title mainTitle="our" subTitle="journey"/>
       <TimelineWithAnimation/>
       <Title mainTitle="Latest" subTitle="Videos"/>
       <LatestVideos />
       <Title mainTitle="management" subTitle="team"/>
       <ManagementTeam/>
       <Footer/>
    </div>
  );
}
