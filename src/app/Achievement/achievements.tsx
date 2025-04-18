import Image from 'next/image'
import image from '../assests/aboutImage.png' // Replace with your team victory image

export default function Achievements() {
  return (
    <section id="achievements" className="text-white px-4 md:px-28 py-16 bg-black">
       
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="flex flex-col items-center p-4 bg-black border border-purple-500/50 rounded-lg shadow-lg shadow-purple-500/20">
          <span className="text-5xl font-bold text-purple-400">12</span>
          <p className="text-center mt-2 text-white">Tournament Wins</p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-black border border-purple-500/50 rounded-lg shadow-lg shadow-purple-500/20">
          <span className="text-5xl font-bold text-purple-400">3</span>
          <p className="text-center mt-2 text-white">Regional Championships</p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-black border border-purple-500/50 rounded-lg shadow-lg shadow-purple-500/20">
          <span className="text-5xl font-bold text-purple-400">87%</span>
          <p className="text-center mt-2 text-white">Win Rate</p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-black border border-purple-500/50 rounded-lg shadow-lg shadow-purple-500/20">
          <span className="text-5xl font-bold text-purple-400">$250K+</span>
          <p className="text-center mt-2 text-white">Prize Earnings</p>
        </div>
      </div>

      {/* Content and Image */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left: Text Content */}
        <div className="md:w-1/2 text-lg">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">Major Milestones</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0 glow-sm">1</div>
              <p><span className="font-semibold text-purple-300">Valorant Champions Tour Finalist</span> - Reached the grand finals in the most prestigious Valorant tournament of 2024.</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0 glow-sm">2</div>
              <p><span className="font-semibold text-purple-300">3x Regional Champions</span> - Dominated our region for three consecutive seasons, setting a new record.</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0 glow-sm">3</div>
              <p><span className="font-semibold text-purple-300">Longest Win Streak</span> - 17 consecutive match victories, the longest in our league's history.</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0 glow-sm">4</div>
              <p><span className="font-semibold text-purple-300">Most MVPs</span> - Our players have claimed MVP status in 8 different tournaments.</p>
            </div>
          </div>
          
          <button className="mt-8 bg-purple-600 hover:bg-purple-700 hover:cursor-pointer text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-lg shadow-purple-500/50">
            Full Tournament History
          </button>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="relative border-2 border-purple-500 rounded-xl overflow-hidden shadow-lg shadow-purple-500/30">
            <Image
              src={image}
              alt="Team holding championship trophy"
              width={600}
              height={400}
              className="rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}