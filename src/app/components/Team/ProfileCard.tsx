'use client';

export interface Player {
  image_url: string;
  name: string;
  role: string;
  age: number;
  country: string;
  bio: string;
}

interface ProfileCardProps {
  player: Player;
  active: boolean;
  onClick: () => void;
}

export default function ProfileCard({ player, active, onClick }: ProfileCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        team-angled min-w-64 cursor-pointer transform transition-transform duration-300 
        ${active ? 'scale-110' : 'scale-100'}
      `}
    >
      <div className="bg-[#610bc6] text-white uppercase text-xs px-4 py-2">
        PROFILE // {player.name}
      </div>
      <div className="border border-[#610bc6]">
        <img
          src={player.image_url}
          alt={player.name}
          width={300}
          height={380}
          className="object-cover"
        />
      </div>
    </div>
  );
}

