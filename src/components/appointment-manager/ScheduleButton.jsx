import React from 'react';
import { CalendarPlus } from 'lucide-react';

export const ScheduleButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-studi-blue hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <CalendarPlus size={18} />
      <span>Agendar Nova Aula</span>
    </button>
  );
};

