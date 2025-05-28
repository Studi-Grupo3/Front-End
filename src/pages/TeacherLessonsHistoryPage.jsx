import React from "react";
import NavbarPanel from "../components/NavbarPanel";
import TabelaAulas from "../components/TabelaAulas";
import { FiSearch } from "react-icons/fi";

const TeacherLessonsHistoryPage = () => {
  return (
    <div className="bg-[#f8f8f8] min-h-screen h-screen overflow-hidden flex flex-col">
      <div className="w-full sticky top-0 z-50">
        <NavbarPanel role="teacher" />
      </div>
      <div className="flex-1 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
            Histórico de Aulas
          </h2>
          <div className="flex gap-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="text-gray-400 w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Buscar no histórico..."
                className="border border-[#E2E8F0] rounded-md px-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ paddingLeft: "2.25rem" }}
              />
            </div>
            <button className="flex items-center gap-1 border border-[#E2E8F0] rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-4.586a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V4z"
                />
              </svg>
              Filtrar
            </button>
          </div>
        </div>

        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mt-4 w-[1000px]">
          <h3 className="text-xl font-bold mb-1">Aulas ministradas</h3>
          <p className="text-sm text-gray-500 mb-4">
            Histórico de aulas concluídas e canceladas.
          </p>
          <TabelaAulas />
        </section>
      </div>
    </div>
  );
};

export default TeacherLessonsHistoryPage;