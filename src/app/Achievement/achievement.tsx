"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, Shield, Sparkles } from "lucide-react";

/**
 * Achievement data type
 */
type Achievement = {
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  type: "victory" | "award" | "milestone";
};

/**
 * Achievement data collection
 */
const achievements: Achievement[] = [
  {
    title: "Balista Cup Champions",
    description: "Won the Balista Cup 2023, marking AGR’s first major competitive triumph.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "2023",
    type: "victory",
  },
  {
    title: "Prayan VKE Champions",
    description: "Secured the championship title at Prayan VKE 2023 with outstanding performance.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "2023",
    type: "victory",
  },
  {
    title: "KCM TDM Champions",
    description: "Triumphed at KCM TDM 2023, showcasing disciplined gameplay.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "2023",
    type: "victory",
  },
  {
    title: "Runner-Up at Diffuse Tournament",
    description: "Achieved Runner-Up position at Diffuse Tournament 2024, earning regional recognition.",
    icon: <Medal className="w-6 h-6 text-gray-300" />,
    date: "February 2024",
    type: "award",
  },
  {
    title: "EUPHOORIA RESPAWN Runner-Up",
    description: "Finished as Runner-Up at EUPHOORIA RESPAWN 2024 for exceptional team coordination.",
    icon: <Medal className="w-6 h-6 text-gray-300" />,
    date: "March 2024",
    type: "award",
  },
  {
    title: "ASCENSION Champions",
    description: "Clinched the ASCENSION 2024 title, demonstrating strategic excellence.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "April 2024",
    type: "victory",
  },
  {
    title: "RAGAN'25 Champions",
    description: "Dominated the RAGAN'25 tournament in 2025, solidifying AGR’s state-wide leadership.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "2025",
    type: "victory",
  },
  {
    title: "VALORENA Champions",
    description: "Secured first place at VALORENA 2025, reinforcing our competitive momentum.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "2025",
    type: "victory",
  },
  {
    title: "AROHA Champions",
    description: "Achieved victory at AROHA 2025 with exceptional team coordination.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "2025",
    type: "victory",
  },
  {
    title: "ELYSIUM Champions",
    description:
      "Triumphed at ELYSIUM 2025, showcasing our relentless drive and skill.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "2025",
    type: "victory",
  },
  {
    title: "MASTERS LMCST Champions",
    description:
      "Secured the championship at MASTERS LMCST 2025, marking another milestone.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "2025",
    type: "victory",
  },
  {
    title: "VELORIA 25 Champions",
    description:
      "Claimed the top spot at VELORIA 25, completing a dominant 2025 season.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "2025",
    type: "victory",
  },
];

/**
 * AchievementsPage Component
 * Displays achievements in a two-column layout on large screens with a center line.
 */
export default function AchievementsPage() {
  const items = achievements.slice().reverse();

  return (
    <main
      id="achievements"
      className="min-h-screen bg-black overflow-x-hidden relative px-4 sm:px-6 md:px-12 lg:px-20 py-16 text-white"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-700 opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-indigo-700 opacity-5 rounded-full blur-3xl" />
      </div>

      {/* Page header */}
      <div className="text-center mb-20 relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <p className="text-lg text-gray-300">A chronicle of our organizational milestones</p>
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
        </motion.div>
      </div>

      {/* Timeline grid container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical center line */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-px bg-purple-800 h-full" />
        </div>

        {/* Grid: 1 col on mobile, 2 cols on lg */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-8">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${
                                  isLeft
                                    ? 'lg:justify-self-end lg:text-left lg:pr-8'
                                    : 'lg:justify-self-start lg:text-left lg:pl-8'
                                }`}
              >
                {/* Timeline node */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-purple-700 rounded-full shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                {/* Date badge */}
                <span
                  className={`absolute top-0 ${isLeft ? 'right-0 lg:mr-4' : 'left-0 lg:ml-4'} bg-purple-800 text-white text-xs font-medium py-1 px-2 rounded-full`}
                >
                  {item.date}
                </span>

                {/* Achievement card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-lg p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-900 group">
                  <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                    <div className="p-3 rounded-full bg-gray-800 group-hover:bg-gray-700 transition-colors">
                      {item.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-base text-gray-300 mb-4 leading-relaxed">{item.description}</p>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-700 bg-opacity-20 text-gray-300 capitalize">
                    {item.type}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center mt-20 relative z-10 max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 text-purple-600 font-medium">
          <span className="w-12 h-px bg-purple-800" />
          <span>Future achievements forthcoming</span>
          <span className="w-12 h-px bg-purple-800" />
        </div>
      </motion.div>
    </main>
  );
}
