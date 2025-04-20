'use client';
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

  return (
    <>
      <Header />
      <div className="relative min-h-screen bg-black text-white pt-32 overflow-hidden">
        {/* Dots Background */}
        <div className="absolute inset-0 bg-dots z-0"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* VALORANT LOGO */}
          <div className="flex justify-center items-center py-10">
            <Image src={ValorantLogo} alt="Valorant" width={200} height={200} />
          </div>

          {/* L1 */}
          <section className="text-center mb-12 py-16 pb-28">
            <h3 className="text-3xl font-bold mb-4 pb-10">L1</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {players.map((player, idx) => (
                <FlipCard key={`l1-${idx}`} name={player.name} role={player.role} />
              ))}
            </div>
          </section>

          {/* L2 */}
          <section className="text-center mb-12 pb-28">
            <h3 className="text-3xl font-bold mb-4 pb-10">L2</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {players.map((player, idx) => (
                <FlipCard key={`l2-${idx}`} name={player.name} role={player.role} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

function FlipCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="w-60 h-80 [perspective:1000px]">
      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180 cursor-pointer">
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
