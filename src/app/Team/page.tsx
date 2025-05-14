'use client';

import { useState } from 'react';
import { Heading, list1, list2 } from '../components/Team/listData';
import TeamHeader from '../Header/teamHeader';
import LineupContent from '../components/Team/lineUpContent';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Lineup() {
   const router = useRouter();
  // Choose which list to use: list1 or list2
  const players: Heading[] = list2; // swap to list1 as needed

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
    <button
          onClick={() => router.back()}
          className="flex items-center text-[#610bc6] mb-8 space-x-2 hover:opacity-80 px-12"
        >
          <ChevronLeft size={20} />
          <span className="uppercase font-medium">Back</span>
        </button>
      <div className="relative z-10 max-w-[1300px] mx-auto px-8 grid grid-cols-12 gap-8 pb-32">
         
        <LineupContent
          current={current}
          players={players}
          page={page}
          setPage={setPage}
          prev={prev}
          next={next}
        />
        <LineupContent
          current={current}
          players={players}
          page={page}
          setPage={setPage}
          prev={prev}
          next={next}
        />
      </div>
    </div>
  );
}