import React, { useState, useEffect } from 'react';
import NavbarPanel from '../components/NavbarTeacher';
import TabelaAulas from '../components/TabelaAulas';
import { teacherService } from '../services/teacherService';

const TeacherChartClassesPage = () => {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    teacherService.getProximasAulas()
      .then(data => setAulas(data))
      .catch(error => {
        console.error('Erro ao carregar próximas aulas:', error);
        setAulas([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#f9fbfc] min-h-screen">
      <div className="w-full sticky top-0 z-50">
        <NavbarPanel role="teacher" />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Gerenciamento de Aulas</h1>
        </div>

        <section className="bg-white rounded-xl p-6 shadow-sm border-gray-200">
          <h2 className="text-xl font-bold mb-1">Próximas aulas</h2>
          <p className="text-sm text-gray-500 mb-4">
            Visualize e gerencie suas aulas agendadas para os próximos dias.
          </p>
          <TabelaAulas aulas={aulas} loading={loading} semAcao />
        </section>
      </div>
    </div>
  );
};

export default TeacherChartClassesPage;
