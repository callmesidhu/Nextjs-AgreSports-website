'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import playercard from '../assests/playercard.jpg';
import ValorantLogo from '../assests/valorantLogo.png';
import Header from '../Header/header';
import TeamHeader from '../Header/teamHeader';

interface Player {
  name: string;
  role: string;
  age: number;
  country: string;
  bio: string;
}

export default function Lineup() {
  const players: Player[] = [
    { name: 'Player One', role: 'Duelist', age: 22, country: 'USA', bio: 'A fearless entry fragger known for high-impact plays.' },
    { name: 'Player Two', role: 'Initiator', age: 24, country: 'Canada', bio: 'Expert at creating space for the team with utility usage.' },
    { name: 'Player Three', role: 'Controller', age: 21, country: 'Germany', bio: 'Master of map control and zoning out opponents.' },
    { name: 'Player Four', role: 'Sentinel', age: 23, country: 'South Korea', bio: 'Defensive anchor who holds angles and watches flanks.' },
  ];

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const handleCardClick = (player: Player) => setSelectedPlayer(player);
  const closeModal = () => setSelectedPlayer(null);

  return (
    <div className="relative min-h-screen text-white pt-32 overflow-hidden">
      <TeamHeader/>
      {/* Dots Background */}
      <div
        className="absolute inset-0 opacity-30 z-0 animate-[dotsMove_10s_linear_infinite]"
        style={{ backgroundImage: 'radial-gradient(#a903fc 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />

      <div className="relative z-10">
        {/* Valorant Logo */}
        <div className="flex justify-center items-center py-10">
          <Image src={ValorantLogo} alt="Valorant" width={200} height={200} />
        </div>

        {/* Lineups */}
        {['L1', 'L2'].map((label) => (
          <section key={label} className="text-center mb-12 py-16 pb-28">
            <h3 className="text-3xl font-bold mb-4 pb-10">{label}</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {players.map((player, idx) => (
                <FlipCard key={`${label}-${idx}`} player={player} onClick={() => handleCardClick(player)} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Modal Popup with Animated Blur */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div className="fixed inset-0 flex items-center justify-center z-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {/* Animated backdrop blur */}
            <motion.div
              className="absolute inset-0  bg-opacity-20"
              onClick={closeModal}
              style={{ backdropFilter: 'blur(0px)' }}
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(3px)' }}
              exit={{ backdropFilter: 'blur(0px)' }}
              transition={{ duration: 1 }}
            />

            {/* Modal content */}
            <motion.div className="relative bg-neutral-900 text-white rounded-lg p-6 max-w-3xl w-full z-30 flex" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }}>
              {/* Card Image */}
              <div className="w-1/3 mr-6">
                <Image src={playercard} alt={selectedPlayer.name} width={300} height={400} className="object-cover rounded-lg" />
              </div>

              {/* Details */}
              <div className="flex-1 relative">
                <button className="absolute top-2 right-2 text-white text-2xl" onClick={closeModal}>
                  ×
                </button>
                <h4 className="text-3xl font-bold mb-2">{selectedPlayer.name}</h4>
                <p className="text-lg mb-1">Role: {selectedPlayer.role}</p>
                <p className="text-lg mb-1">Age: {selectedPlayer.age}</p>
                <p className="text-lg mb-4">Country: {selectedPlayer.country}</p>
                <h5 className="text-xl font-semibold mb-2">Bio:</h5>
                <p className="text-base leading-relaxed">{selectedPlayer.bio}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FlipCard({ player, onClick }: { player: Player; onClick: () => void }) {
  return (
    <div className="w-60 h-80 group cursor-pointer" onClick={onClick}>
      <div className="relative w-full h-full duration-500 hover:transform hover:scale-105">
        <Image src={playercard} alt={player.name} fill className="object-cover rounded-xl shadow-lg" />
      </div>
    </div>
  );
}
