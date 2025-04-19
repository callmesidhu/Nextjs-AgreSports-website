"use client"

import { Trophy, Award, Star, DollarSign, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function Achievements() {
  const [activeIndex, setActiveIndex] = useState(0)

  const milestones = [
    {
      title: "Valorant Champions Tour Finalist",
      desc: "Reached the grand finals in the most prestigious Valorant tournament of 2024.",
      year: "2024",
    },
    {
      title: "3x Regional Champions",
      desc: "Dominated our region for three consecutive seasons, setting a new record.",
      year: "2023",
    },
    {
      title: "Longest Win Streak",
      desc: "17 consecutive match victories, the longest in our league's history.",
      year: "2022",
    },
    {
      title: "Most MVPs",
      desc: "Our players have claimed MVP status in 8 different tournaments.",
      year: "2021",
    },
  ]

  return (
    <section
      id="achievements"
      className="bg-gradient-to-b from-black to-purple-950 text-white px-4 md:px-28 py-16 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-purple-500 blur-[100px]"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-purple-700 blur-[120px]"></div>
      </div>

      <div className="relative z-10">
      
        <p className="text-center text-purple-200 max-w-2xl mx-auto mb-16 opacity-80">
          A legacy of excellence built through dedication, teamwork, and relentless pursuit of victory
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {[
            { value: "12", label: "Tournament Wins", icon: <Trophy className="w-8 h-8 text-purple-400" /> },
            { value: "3", label: "Regional Championships", icon: <Award className="w-8 h-8 text-purple-400" /> },
            { value: "87%", label: "Win Rate", icon: <Star className="w-8 h-8 text-purple-400" /> },
            { value: "$250K+", label: "Prize Earnings", icon: <DollarSign className="w-8 h-8 text-purple-400" /> },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-5 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-600/40 shadow-lg shadow-purple-500/10 hover:border-purple-500/70 transition-all duration-300 group"
            >
              <div className="p-3 bg-purple-900/50 rounded-full mb-3 group-hover:bg-purple-800 transition-colors">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-purple-300 group-hover:text-purple-200 transition-colors">
                {stat.value}
              </h3>
              <p className="mt-1 text-sm text-purple-100/80">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Milestones Section - Redesigned */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-purple-300 mb-10 text-center">Major Milestones</h3>

          {/* Timeline Navigation */}
          <div className="flex justify-center mb-8 overflow-x-auto w-full pb-2">
            <div className="flex space-x-1 md:space-x-2">
              {milestones.map((milestone, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-purple-600 text-white"
                      : "bg-purple-900/30 text-purple-200/70 hover:bg-purple-800/50"
                  }`}
                >
                  {milestone.year}
                </button>
              ))}
            </div>
          </div>

          {/* Active Milestone Card */}
          <div className="w-full max-w-3xl">
            <div className="bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-purple-500/30 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="hidden md:flex items-center justify-center w-16 h-16 bg-purple-800/50 rounded-full flex-shrink-0 border-2 border-purple-400">
                  <span className="text-2xl font-bold text-purple-200">{milestones[activeIndex].year}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl md:text-2xl font-bold text-purple-300 mb-3">
                    {milestones[activeIndex].title}
                  </h4>
                  <p className="text-white/80 text-base md:text-lg">{milestones[activeIndex].desc}</p>

                  {/* Navigation Controls */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : milestones.length - 1))}
                      className="p-2 rounded-full bg-purple-900/50 hover:bg-purple-700 transition-colors"
                      aria-label="Previous milestone"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button
                      onClick={() => setActiveIndex((prev) => (prev < milestones.length - 1 ? prev + 1 : 0))}
                      className="p-2 rounded-full bg-purple-900/50 hover:bg-purple-700 transition-colors"
                      aria-label="Next milestone"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {milestones.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "bg-purple-500 w-6" : "bg-purple-700/50"
                }`}
                aria-label={`Go to milestone ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
