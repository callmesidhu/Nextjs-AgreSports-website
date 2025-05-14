
import ProfileCard from './ProfileCard';
import PaginationControls from './PaginationControls';
import { Heading } from './listData';

interface LineupContentProps {
  current: Heading;
  players: Heading[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  prev: () => void;
  next: () => void;
}

export default function LineupContent({ current, players, page, setPage, prev, next }: LineupContentProps) {
 

  return (
    <>
      {/* LEFT PANEL */}
      <div className="lg:col-span-5 col-span-12 flex flex-col justify-between ">

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

        <PaginationControls page={page} total={players.length} onPrev={prev} onNext={next} />
      </div>

      {/* RIGHT PANEL: profile cards */}
      <div className="lg:col-span-7 col-span-12 flex justify-center items-start space-x-6 pt-12">
        {players.map((item, idx) => (
          <ProfileCard
            key={idx}
            player={item as any}
            active={idx === page - 1}
            onClick={() => setPage(idx + 1)}
          />
        ))}
      </div>
    </>
  );
}
