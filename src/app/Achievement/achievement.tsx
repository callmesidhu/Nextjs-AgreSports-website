"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase"; 
import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";

type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "victory" | "award" | "milestone";
};

const iconMap: Record<Achievement["type"], React.ReactNode> = {
  victory: <Trophy className="w-6 h-6 text-gray-300" />,
  award: <Medal className="w-6 h-6 text-gray-300" />,
  milestone: <span className="text-yellow-300">★</span>,
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchAchievements = async () => {
      const querySnapshot = await getDocs(collection(db, "achievements"));
      const data: Achievement[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Achievement[];

      // Optional: Sort by date descending
      const sorted = [...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setAchievements(sorted);
    };

    fetchAchievements();
  }, []);

  const visibleItems = achievements.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white ">
    
      <div className="text-center mb-12">
        <p className="text-gray-400 mt-2">A chronicle of our organizational milestones</p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute inset-0 flex justify-center">
          <div className="w-px bg-purple-800 h-full" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-8">
          {visibleItems.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative  ${
                  isLeft
                    ? "lg:justify-self-end lg:pr-8 text-right"
                    : "lg:justify-self-start lg:pl-8 text-left"
                }`}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full"></div>
                <span
                  className={`absolute top-0 ${
                    isLeft ? "right-0 lg:mr-4" : "left-0 lg:ml-4"
                  } bg-purple-700 text-white text-xs font-medium px-2 py-1 rounded-full`}
                >
                  {item.date}
                </span>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg hover:border-purple-700 hover:shadow-xl transition">
                  <div className="flex items-center mb-4 justify-between">
                    {isLeft ? null : iconMap[item.type] }
                    <h3 className={`text-xl font-semibold text-white ${isLeft ? "text-right" : "text-left"}`}>{item.title}</h3>
                    {isLeft ? (iconMap[item.type]) : null}
                  </div>
                  <p className="text-gray-300 mb-2 text-left">{item.description}</p>
                  <span className="inline-block text-xs font-medium bg-purple-800 text-white px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {visibleCount < achievements.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => Math.min(prev + 4, achievements.length))}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-full font-medium transition"
          >
            Read more
          </button>
        </div>
      )}

      <div className="flex justify-center items-center gap-2 mt-8 text-purple-600 font-medium">
        <span className="w-12 h-px bg-purple-800" />
        <span>Future achievements forthcoming</span>
        <span className="w-12 h-px bg-purple-800" />
      </div>
    </main>
  );
}
