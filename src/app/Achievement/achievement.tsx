"use client";

import Image from "next/image";
import trophy from "../assests/agrLogo.png";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, Shield, Sparkles } from "lucide-react";

type Achievement = {
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  type: "victory" | "award" | "milestone";
};

const achievements: Achievement[] = [
  {
    title: "Champions - Valorant Tournament",
    description: "AGR Esports secured 1st place in the MEC LAN 2024 event, defeating 16 teams.",
    icon: <Trophy className="w-6 h-6 text-[#ffd700]" />,
    date: "December 2024",
    type: "victory",
  },
  {
    title: "Top 4 - National PUBG Showdown",
    description: "Advanced to semi-finals in a national-level battlegrounds competition with over 200 teams.",
    icon: <Medal className="w-6 h-6 text-[#c0c0c0]" />,
    date: "October 2024",
    type: "award",
  },
  {
    title: "MVP Recognition",
    description: "Our player Xeno was awarded MVP in 3 consecutive tournaments for exceptional gameplay.",
    icon: <Star className="w-6 h-6 text-[#ffd700]" />,
    date: "September 2024",
    type: "milestone",
  },
  {
    title: "Best Team Coordination",
    description: "Awarded at Thudi '24 for flawless team synergy and strategic excellence.",
    icon: <Shield className="w-6 h-6 text-[#cd7f32]" />,
    date: "August 2024",
    type: "award",
  },
];

export default function AchievementsPage() {
  return (
    <main
      id="achievements"
      className="min-h-screen bg-[#0a0a0a] overflow-x-hidden relative px-4 sm:px-6 md:px-12 lg:px-20 py-10 text-white"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#a903fc] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-[#6903fc] opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="text-center mb-20 relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-[#a903fc]" />
            <p className="text-xl text-gray-300">Scroll through our journey of wins and milestones</p>
            <Sparkles className="w-5 h-5 text-[#a903fc]" />
          </div>
        </motion.div>
      </div>

      {/* Center the timeline container and set max width */}
      <div className="max-w-4xl mx-auto relative">
        {/* Timeline with adjusted positioning */}
        <div className="relative border-l-[3px] border-[#a903fc60] ml-8 md:ml-16 pl-12 space-y-16">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline date - adjusted positioning */}
              <span className="absolute left-[-52px] -top-7 bg-[#a903fc] text-black text-xs font-bold py-1 px-3 rounded-full">
                {item.date}
              </span>

              {/* Timeline marker - adjusted positioning */}
              <div className="absolute left-[-51px] top-6 w-5 h-5 bg-[#a903fc] rounded-full shadow-[0_0_15px_#a903fc] flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full" />
              </div>

              {/* Achievement card with consistent width */}
              <div className="bg-gradient-to-br from-[#131313] to-[#1a1a1a] border border-[#a903fc30] rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-[0_0_30px_#a903fc40] transition-all duration-300 hover:scale-[1.02] hover:translate-x-2 group w-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#a903fc20] group-hover:bg-[#a903fc30] transition-colors border border-[#a903fc30]">
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{item.title}</h3>
                </div>

                <p className="text-base text-gray-300 mb-4 leading-relaxed">{item.description}</p>

                {/* Achievement type badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${
                      item.type === "victory"
                        ? "bg-[#ffd70020] text-[#ffd700]"
                        : ""
                    } ${item.type === "award" ? "bg-[#c0c0c020] text-[#c0c0c0]" : ""} ${
                      item.type === "milestone"
                        ? "bg-[#cd7f3220] text-[#cd7f32]"
                        : ""
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center mt-20 relative z-10 max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 text-[#a903fc] font-bold">
          <span className="w-12 h-[2px] bg-[#a903fc60]" />
          <span>More achievements coming soon</span>
          <span className="w-12 h-[2px] bg-[#a903fc60]" />
        </div>
      </motion.div>
    </main>
  );
}
