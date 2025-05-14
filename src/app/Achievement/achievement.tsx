"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Sparkles } from "lucide-react";

type Achievement = {
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  type: "victory" | "award" | "milestone";
};

// Full data array
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
    description: "Triumphed at ELYSIUM 2025, showcasing our relentless drive and skill.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "2025",
    type: "victory",
  },
  {
    title: "MASTERS LMCST Champions",
    description: "Secured the championship at MASTERS LMCST 2025, marking another milestone.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "2025",
    type: "victory",
  },
  {
    title: "VELORIA 25 Champions",
    description: "Claimed the top spot at VELORIA 25, completing a dominant 2025 season.",
    icon: <Trophy className="w-6 h-6 text-gray-300" />,
    date: "2025",
    type: "victory",
  },
];

export default function AchievementsPage() {
  // Reverse to show newest first
  const allItems = achievements.slice().reverse();

  // How many to show initially
  const [visibleCount, setVisibleCount] = useState(4);

  // Only show the first N
  const visibleItems = allItems.slice(0, visibleCount);

  // Show 4 more on each click
  const handleReadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, allItems.length));
  };

  return (
    <main
      id="achievements"
      className="min-h-screen bg-black overflow-x-hidden relative px-4 sm:px-6 md:px-12 lg:px-20 py-16 text-white"
    >
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">Our Achievements</h1>
        <p className="text-gray-400 mt-2">A chronicle of our organizational milestones</p>
      </div>

      {/* Timeline Grid */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center Line */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-px bg-purple-800 h-full" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-8">
          {visibleItems.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${
                  isLeft ? "lg:justify-self-end lg:pr-8 text-right" : "lg:justify-self-start lg:pl-8 text-left"
                }`}
              >
                {/* Node Dot */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full"></div>

                {/* Date Badge */}
                <span
                  className={`absolute top-0 ${
                    isLeft ? "right-0 lg:mr-4" : "left-0 lg:ml-4"
                  } bg-purple-700 text-white text-xs font-medium px-2 py-1 rounded-full`}
                >
                  {item.date}
                </span>

                {/* Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg hover:border-purple-700 hover:shadow-xl transition">
                  <div className="flex items-center mb-4 justify-between">
                    {isLeft ? null : item.icon}
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    {isLeft ? item.icon : null}
                  </div>
                  <p className="text-gray-300 mb-2">{item.description}</p>
                  <span className="inline-block text-xs font-medium bg-purple-800 text-white px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Read more button */}
      {visibleCount < allItems.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleReadMore}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-full font-medium transition"
          >
            Read more
          </button>
        </div>
      )}
      <div className="items-center gap-2 text-purple-600 font-medium text-center flex justify-center mt-8">
          <span className="w-2 md:w-12 h-px bg-purple-800" />
          <span className="text-center">Future achievements forthcoming</span>
          <span className="w-2 md:w-12 h-px bg-purple-800" />
        </div>
    </main>
  );
}
