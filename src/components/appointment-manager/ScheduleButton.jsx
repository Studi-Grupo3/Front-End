import React from 'react';
import { CalendarPlus } from 'lucide-react';

export const ScheduleButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--azul-custom)] cursor-pointer hover:bg-blue-500 text-white flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <CalendarPlus size={18} />
      <span className="text-xs sm:text-sm">Agendar Nova Aula</span>
    </button>
  );
};