// app/Lineup.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import TeamHeader from '../Header/teamHeader';
import ProfileCard from '../components/Team/ProfileCard';
import PaginationControls from '../components/Team/PaginationControls';
import { Heading, list1, list2 } from '../components/Team/listData';

export default function Lineup() {
  const router = useRouter();

  // Swap between list1 and list2 as needed
  const players: Heading[] = list1; // or list2

  const [page, setPage] = useState(1);
  const current = players[page - 1];

  const prev = () => setPage(p => Math.max(1, p - 1));
  const next = () => setPage(p => Math.min(players.length, p + 1));

  return (
    <div className="relative min-h-screen text-white pt-32 overflow-hidden bg-black">
      <TeamHeader />

      {/* Dots Background */}
      <div
        className="absolute inset-0 opacity-20 z-0 animate-[dotsMove_10s_linear_infinite]"
        style={{
          backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 max-w-[1300px] mx-auto px-8 grid grid-cols-12 gap-8">
        {/* LEFT PANEL */}
        <div className="col-span-5 flex flex-col justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#610bc6] mb-8 space-x-2 hover:opacity-80"
          >
            <ChevronLeft size={20} />
            <span className="uppercase font-medium">Back</span>
          </button>

          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="block w-1 h-6 bg-[#610bc6]" />
              <span className="uppercase text-sm tracking-widest text-gray-400">
                {current.fullName}
              </span>
            </div>
            <h1 className="text-[4rem] font-black leading-tight text-[#610bc6]">
              {current.name}
            </h1>
            <p className="text-gray-300 leading-relaxed">{current.bio}</p>
          </div>

          <PaginationControls
            page={page}
            total={players.length}
            onPrev={prev}
            onNext={next}
          />
        </div>

        {/* RIGHT PANEL: cards for all items in the chosen list */}
        <div className="col-span-7 flex justify-center items-start space-x-6 pt-12">
          {players.map((item, idx) => (
            <ProfileCard
              key={idx}
              player={item as any} // Heading matches Player shape
              active={idx === page - 1}
              onClick={() => setPage(idx + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}