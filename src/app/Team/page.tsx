'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import playercard from '../assests/playercard.jpg';
import ValorantLogo from '../assests/valorantLogo.png';
import Header from '../Header/header';
import Footer from '../Footer/footer';

export default function Lineup() {
  const players = [
    { name: 'Player One', role: 'Duelist' },
    { name: 'Player Two', role: 'Initiator' },
    { name: 'Player Three', role: 'Controller' },
    { name: 'Player Four', role: 'Sentinel' },
  ];

  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleFlip = (idx: number) => {
    if (!isMobile) return;
    setFlippedCard(flippedCard === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen bg-black text-white pt-32 overflow-hidden">
      {/* Dots Background */}
      <div
        className="absolute inset-0 opacity-30 z-0 animate-[dotsMove_10s_linear_infinite]"
        style={{
          backgroundImage: 'radial-gradient(#a903fc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative z-10">
        {/* Valorant Logo */}
        <div className="flex justify-center items-center py-10">
          <Image src={ValorantLogo} alt="Valorant" width={200} height={200} />
        </div>

        {/* L1 */}
        <section className="text-center mb-12 py-16 pb-28">
          <h3 className="text-3xl font-bold mb-4 pb-10">L1</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {players.map((player, idx) => (
              <FlipCard
                key={`l1-${idx}`}
                name={player.name}
                role={player.role}
                isFlipped={flippedCard === idx}
                isMobile={isMobile}
                onClick={() => handleFlip(idx)}
              />
            ))}
          </div>
        </section>

        {/* L2 */}
        <section className="text-center mb-12 pb-28">
          <h3 className="text-3xl font-bold mb-4 pb-10">L2</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {players.map((player, idx) => {
              const indexOffset = idx + players.length; // To avoid ID clash
              return (
                <FlipCard
                  key={`l2-${idx}`}
                  name={player.name}
                  role={player.role}
                  isFlipped={flippedCard === indexOffset}
                  isMobile={isMobile}
                  onClick={() => handleFlip(indexOffset)}
                />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function FlipCard({
  name,
  role,
  isFlipped,
  isMobile,
  onClick,
}: {
  name: string;
  role: string;
  isFlipped: boolean;
  isMobile: boolean;
  onClick: () => void;
}) {
  return (
    <div className="w-60 h-80 [perspective:1000px]" onClick={onClick}>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isMobile ? (isFlipped ? 'rotate-y-180' : '') : 'hover:rotate-y-180'
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden">
          <Image
            src={playercard}
            alt="Player Card Front"
            fill
            className="object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Back */}
        <div className="absolute w-full h-full bg-neutral-900 text-white rounded-xl shadow-lg rotate-y-180 backface-hidden flex flex-col items-center justify-center px-4 text-center">
          <h4 className="text-2xl font-bold mb-2">{name}</h4>
          <p className="text-lg">{role}</p>
        </div>
      </div>
    </div>
  );
}
