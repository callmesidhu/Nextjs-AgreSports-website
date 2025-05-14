'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  page: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function PaginationControls({ page, total, onPrev, onNext }: PaginationControlsProps) {
  return (
    <div className="mt-12 flex items-center space-x-4">
      <span className="text-2xl font-bold text-[#610bc6]">{page}</span>
      <div className="flex-1 border-t border-gray-600" />
      <span className="text-2xl font-bold text-[#610bc6]">{total}</span>
      <button onClick={onPrev} className="p-2 bg-[#610bc6] rounded hover:opacity-90">
        <ChevronLeft className="text-white" size={18} />
      </button>
      <button onClick={onNext} className="p-2 bg-[#610bc6] rounded hover:opacity-90">
        <ChevronRight className="text-white" size={18} />
      </button>
    </div>
  );
}
