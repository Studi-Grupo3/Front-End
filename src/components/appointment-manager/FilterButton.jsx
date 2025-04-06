import { useState } from 'react';
import { Filter } from 'lucide-react';

export const FilterButton = () => {
  const [aberto, setAberto] = useState(false);

  const toggleDropdown = () => setAberto((prev) => !prev);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition"
      >
        <Filter size={18} />
        <span className="font-medium">Todos os filtros</span>
        <svg
          className={`w-4 h-4 transition-transform ${aberto ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {aberto && (
        <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          <div className="px-4 py-2 font-semibold text-gray-900 text-sm border-b-2 border-gray-300">
            Filtrar por
          </div>

          <div className="flex flex-col text-sm font-medium text-gray-900">
            <button className="px-4 py-3 text-left hover:bg-gray-100">Aulas Confirmadas</button>
            <button className="px-4 py-3 text-left hover:bg-gray-100">Aulas Pendentes</button>
            <button className="px-4 py-3 text-left hover:bg-gray-100">Aulas Canceladas</button>

            {/* divisor personalizado igual ao da imagem */}
            <div className="border-t-2 border-gray-300 my-1"></div>

            <button className="px-4 py-3 text-left hover:bg-gray-100">Aulas Online</button>
            <button className="px-4 py-3 text-left hover:bg-gray-100">Aulas Presenciais</button>
          </div>
        </div>
      )}
    </div>
  );
};
