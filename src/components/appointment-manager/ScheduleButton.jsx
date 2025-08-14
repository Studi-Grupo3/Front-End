import React from 'react';
import { CalendarPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ScheduleButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/aluno/agendamento/criar")}
      className="bg-[#2462C2] border-[0.1px] border-white cursor-pointer hover:bg-blue-500 text-white flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <CalendarPlus size={18} />
      <span className="text-xs sm:text-sm">Agendar Nova Aula</span>
    </button>
  );
};