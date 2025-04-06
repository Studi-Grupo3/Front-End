import React from 'react';
import { Filter } from 'lucide-react';

export const FilterButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Filter size={16} />
      <span>Todos os filtros</span>
    </button>
  );
};