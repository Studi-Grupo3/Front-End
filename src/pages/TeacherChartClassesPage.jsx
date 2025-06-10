import React from 'react';
import TabelaAulas from '../components/TabelaAulas';
import NavbarPanel from '../components/NavbarPanel';
import { FiSearch } from 'react-icons/fi';

const TeacherChartClassesPage = () => {
  return (
    <div className="bg-[#f9fbfc] min-h-screen">
      <div className="w-full sticky top-0 z-50">
        <NavbarPanel role="teacher"/>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Gerenciamento de Aulas</h1>
          <div className="flex gap-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="text-gray-400 w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Buscar aulas..."
                className="border border-[#E2E8F0] rounded-md px-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ paddingLeft: '2.25rem' }}
              />
            </div>
            <button className="flex items-center gap-1 border border-[#E2E8F0] rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-4.586a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V4z" />
              </svg>
              Filtrar
            </button>
          </div>
        </div>
        <section className="bg-white rounded-xl p-6 shadow-sm border-gray-200">
          <h2 className="text-xl font-bold mb-1">Próximas aulas</h2>
          <p className="text-sm text-gray-500 mb-4">
            Visualize e gerencie suas aulas agendadas para os próximos dias.
          </p>
          <TabelaAulas />
        </section>
      </div>
    </div>
  );
};

export default TeacherChartClassesPage;