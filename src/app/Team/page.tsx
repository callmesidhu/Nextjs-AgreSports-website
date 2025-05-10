// components/Lineup.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import playercard from '../assests/playercard.jpg';
import TeamHeader from '../Header/teamHeader';

interface Player {
  fullName: string;
  name: string;
  role: string;
  age: number;
  country: string;
  bio: string;
}

export default function Lineup() {
  const router = useRouter();

  const players: Player[] = [
    {
      fullName: 'YASSIN “REDUXX” ABOULALAZM',
      name: 'REDUXX',
      role: 'Duelist',
      age: 17,
      country: 'India',
      bio: 'Due to his age, see that his firepower and game knowledge rival those of veterans…'
    },
    {
      fullName: 'ETHAN “NISMO” CARSON',
      name: 'NISMO',
      role: 'Controller',
      age: 28,
      country: 'Poland',
      bio: 'An unshakeable anchor, reads utility as if it were open book and locks down sites with surgical precision.'
    },
    {
      fullName: 'JAYLEN “NIGHTZ” RIVERS',
      name: 'NIGHTZ',
      role: 'Sentinel',
      age: 21,
      country: 'USA',
      bio: 'Silent but deadly — expert at locking flanks and turning lone pushes into teamwide holds.'
    },
    // …add up to 6 total
  ];

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
        {/* ————— LEFT PANEL ————— */}
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
            <p className="text-gray-300 leading-relaxed">
              {current.bio}
            </p>
          </div>

          <div className="mt-12 flex items-center space-x-4">
            <span className="text-2xl font-bold text-[#610bc6]">{page}</span>
            <div className="flex-1 border-t border-gray-600" />
            <span className="text-2xl font-bold text-[#610bc6]">
              {players.length}
            </span>

            <button
              onClick={prev}
              className="p-2 bg-[#610bc6] rounded hover:opacity-90"
            >
              <ChevronLeft className="text-white" size={18} />
            </button>
            <button
              onClick={next}
              className="p-2 bg-[#610bc6] rounded hover:opacity-90"
            >
              <ChevronRight className="text-white" size={18} />
            </button>
          </div>
        </div>

        {/* ————— RIGHT PANEL: all cards in a row ————— */}
        <div className="col-span-7 flex justify-center items-start space-x-6 pt-12">
          {players.map((plr, idx) => (
            <ProfileCard
              key={idx}
              player={plr}
              active={idx === page - 1}
              onClick={() => setPage(idx + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileCard({
  player,
  active,
  onClick,
}: {
  player: Player;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        team-angled w-64 cursor-pointer transform transition-transform duration-300
        ${active ? 'scale-110' : 'scale-100'}
      `}
    >
      <div className="bg-[#610bc6] text-white uppercase text-xs px-4 py-2">
        PROFILE // {player.name}
      </div>
      <div className="border border-[#610bc6]">
        <Image
          src={playercard}
          alt={player.name}
          width={300}
          height={380}
          className="object-cover "
        />
      </div>
    </div>
  );
}
