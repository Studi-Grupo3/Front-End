import React, { useState, useEffect } from 'react';
import LinhaAula from './LinhaAula';
import { teacherDashboardService } from '../services/teacherDashboardService';

const ITEMS_PER_PAGE = 6;

const TabelaAulas = ({ aulas: aulasProp = null, loading: loadingProp = false }) => {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Se receber aulas por props, usa elas. Senão, busca do backend.
  useEffect(() => {
    if (aulasProp) {
      setAulas(aulasProp);
      setLoading(!!loadingProp);
    } else {
      setLoading(true);
      teacherDashboardService.getLessonsHistory()
        .then(data => setAulas(data))
        .catch(() => setAulas([]))
        .finally(() => setLoading(false));
    }
  }, [aulasProp, loadingProp]);

  const totalPages = Math.ceil(aulas.length / ITEMS_PER_PAGE);
  const paginatedAulas = aulas.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="overflow-x-auto">
      <div className="border rounded-lg" style={{ borderColor: '#E2E8F0' }}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500" style={{ borderBottom: '1px solid #E2E8F0' }}>
              <th className="px-4 py-2 border" style={{ borderColor: '#E2E8F0' }}>Aluno</th>
              <th className="px-4 py-2 border" style={{ borderColor: '#E2E8F0' }}>Disciplina</th>
              <th className="px-4 py-2 border" style={{ borderColor: '#E2E8F0' }}>Data</th>
              <th className="px-4 py-2 border" style={{ borderColor: '#E2E8F0' }}>Horário</th>
              <th className="px-4 py-2 border" style={{ borderColor: '#E2E8F0' }}>Duração</th>
              <th className="px-4 py-2 border" style={{ borderColor: '#E2E8F0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8">Carregando...</td>
              </tr>
            ) : paginatedAulas.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8">Nenhuma aula encontrada.</td>
              </tr>
            ) : (
              paginatedAulas.map((aula, index) => (
                <LinhaAula key={index + (currentPage - 1) * ITEMS_PER_PAGE} {...aula} semAcao />
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Paginação */}
      <div className="flex justify-end items-center gap-2 mt-4 pb-4 bg-white">
        <button
          className="px-3 py-1 rounded border text-sm disabled:opacity-50"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button
          className="px-3 py-1 rounded border text-sm disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          ‹
        </button>
        <span className="px-2 text-sm text-gray-700">
          Página {currentPage} de {totalPages || 1}
        </span>
        <button
          className="px-3 py-1 rounded border text-sm disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          ›
        </button>
        <button
          className="px-3 py-1 rounded border text-sm disabled:opacity-50"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default TabelaAulas;
