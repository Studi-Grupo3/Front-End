import React, { useEffect, useState } from "react";
import NavbarPanel from "../components/NavbarPanel";
import TabelaAulas from "../components/TabelaAulas";
import { teacherService } from "../services/teacherService";

const TeacherLessonsHistoryPage = () => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    teacherService
      .getLessonsHistory()
      .then(setHistorico)
      .catch(() => setHistorico([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#f9fbfc] min-h-screen">
      <div className="w-full sticky top-0 z-50">
        <NavbarPanel role="teacher" />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Histórico de Aulas</h1>
        </div>

        <section className="bg-white rounded-xl p-6 shadow-sm border-gray-200">
          <h2 className="text-xl font-bold mb-1">Aulas ministradas</h2>
          <p className="text-sm text-gray-500 mb-4">
            Histórico de aulas concluídas e canceladas.
          </p>
          <TabelaAulas aulas={historico} loading={loading} semAcao />
        </section>
      </div>
    </div>
  );
};

export default TeacherLessonsHistoryPage;
