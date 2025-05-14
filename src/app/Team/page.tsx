// app/Lineup.tsx
'use client';

import { useState } from 'react';
import { Heading, list1, list2 } from '../components/Team/listData';
import TeamHeader from '../Header/teamHeader';
import LineupContent from '../components/Team/lineUpContent';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Lineup() {
  const router = useRouter();

  // separate paging state for each list
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);

  // navigation helpers for list1
  const prev1 = () => setPage1(p => Math.max(1, p - 1));
  const next1 = () => setPage1(p => Math.min(list1.length, p + 1));
  const current1 = list1[page1 - 1];

  // navigation helpers for list2
  const prev2 = () => setPage2(p => Math.max(1, p - 1));
  const next2 = () => setPage2(p => Math.min(list2.length, p + 1));
  const current2 = list2[page2 - 1];

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

        {/* Lineup 1 */}
        <div className="col-span-12">
          <h2 className="text-4xl font-semibold text-center">L1</h2>
        </div>
        <LineupContent
          current={current1}
          players={list1}
          page={page1}
          setPage={setPage1}
          prev={prev1}
          next={next1}
        />

        {/* Lineup 2 */}
        <div className="col-span-12 mt-12">
          <h2 className="text-4xl font-semibold text-center">L2</h2>
        </div>
        <LineupContent
          current={current2}
          players={list2}
          page={page2}
          setPage={setPage2}
          prev={prev2}
          next={next2}
        />

      </div>
    </div>
  );
}
