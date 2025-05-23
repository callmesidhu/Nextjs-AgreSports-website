import React, { useEffect, useRef } from 'react';
import ProfileCard from './ProfileCard';
import PaginationControls from './PaginationControls';
import { FaInstagram, FaDiscord, FaYoutube } from 'react-icons/fa';

interface Heading {
  name?: string;
  role?: string;
  description?: string;
  instagram_url?: string;
  discord_url?: string;
  youtube_url?: string;
}

interface LineupContentProps {
  current: Heading;
  players: Heading[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  prev: () => void;
  next: () => void;
}


export default function LineupContent({ current, players, page, setPage, prev, next }: LineupContentProps) {
const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Center the selected card horizontally—no vertical movement.
  useEffect(() => {
    const selected = cardRefs.current[page - 1];
    const container = containerRef.current;
    if (selected && container) {
      const cardLeft = selected.offsetLeft;
      const cardWidth = selected.offsetWidth;
      const containerWidth = container.clientWidth;
      const screenValue = window.innerWidth >= 768 ? 1 : 2;
      const scrollX = cardLeft - (containerWidth /screenValue  - cardWidth / 2);

      container.scrollTo({ left: scrollX, behavior: 'smooth' });
    }
  }, [page]);
  
  return (
    <>
     
      <div className="lg:col-span-5 col-span-12 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <span className="block w-1 h-6 bg-[#610bc6]" />
            <span className="uppercase text-sm tracking-widest text-gray-400">
              {current.role}
            </span>
          </div>
          <h1 className="text-[4rem] font-black leading-tight text-[#610bc6]">
            {current.name}
          </h1>
          <p className="text-gray-300 leading-relaxed">{current.description}</p>

   
          <div className="flex space-x-6 mt-4 text-gray-400">
            <a
              href={current.instagram_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-200 transition-transform hover:scale-150 duration-300"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href={current.discord_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-200 transition-transform hover:scale-125 duration-300"
            >
              <FaDiscord size={28} />
            </a>
            <a
              href={current.youtube_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-200 transition-transform hover:scale-125 duration-300"
            >
              <FaYoutube size={28} />
            </a>
          </div>
        </div>

        <PaginationControls page={page} total={players.length} onPrev={prev} onNext={next} />
      </div>


      <div
        ref={containerRef}
        className="
          items-center lg:pt-12 pt-16
          lg:col-span-7 col-span-12
          flex flex-row 
          overflow-x-hidden overflow-y-hidden
          scroll-smooth
          gap-6
          justify-start
        "
      >
        {players.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => { cardRefs.current[idx] = el; }}
            onClick={() => setPage(idx + 1)}
            className='p-5'
          >
            <ProfileCard player={item as any} active={idx === page - 1} onClick={function (): void {
              throw new Error('Function not implemented.');
            } } />
          </div>
        ))}
      </div>

    </>
  );
}
