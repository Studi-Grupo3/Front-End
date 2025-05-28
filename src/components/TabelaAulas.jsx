import React, { useState } from 'react';
import LinhaAula from './LinhaAula';

const aulas = [
  {
    aluno: 'Maria Santos',
    disciplina: 'Matemática - Cálculo I',
    data: '12/05/2023',
    horario: '14:00',
    duracao: '1h30min',
    status: 'Concluída',
  },
  {
    aluno: 'João Oliveira',
    disciplina: 'Física - Mecânica',
    data: '12/05/2023',
    horario: '16:30',
    duracao: '2h',
    status: 'Concluída',
  },
  {
    aluno: 'Ana Silva',
    disciplina: 'Química - Orgânica',
    data: '13/05/2023',
    horario: '09:00',
    duracao: '1h',
    status: 'Cancelada',
  },
  {
    aluno: 'Pedro Costa',
    disciplina: 'Biologia - Genética',
    data: '15/05/2023',
    horario: '10:30',
    duracao: '2h',
    status: 'Concluída',
  },
  {
    aluno: 'Luísa Mendes',
    disciplina: 'Matemática - Geometria',
    data: '16/05/2023',
    horario: '13:00',
    duracao: '1h',
    status: 'Concluída',
  },
  {
    aluno: 'Carlos Eduardo',
    disciplina: 'Inglês - Conversação',
    data: '17/05/2023',
    horario: '15:00',
    duracao: '1h30min',
    status: 'Concluída',
  },
  {
    aluno: 'Juliana Alves',
    disciplina: 'História - Idade Média',
    data: '18/05/2023',
    horario: '11:00',
    duracao: '1h30min',
    status: 'Concluída',
  },
  {
    aluno: 'Roberta Santos',
    disciplina: 'Geografia - Geopolítica',
    data: '19/05/2023',
    horario: '09:30',
    duracao: '2h',
    status: 'Concluída',
  },
  // Aulas extras para testar o scroll
  {
    aluno: 'Aluno 9',
    disciplina: 'Português - Redação',
    data: '20/05/2023',
    horario: '08:00',
    duracao: '1h',
    status: 'Concluída',
  },
  {
    aluno: 'Aluno 10',
    disciplina: 'Artes - História da Arte',
    data: '21/05/2023',
    horario: '10:00',
    duracao: '1h30min',
    status: 'Concluída',
  },
  {
    aluno: 'Aluno 11',
    disciplina: 'Filosofia - Ética',
    data: '22/05/2023',
    horario: '12:00',
    duracao: '2h',
    status: 'Concluída',
  },
  {
    aluno: 'Aluno 12',
    disciplina: 'Sociologia - Cultura',
    data: '23/05/2023',
    horario: '14:00',
    duracao: '1h',
    status: 'Cancelada',
  },
  {
    aluno: 'Aluno 13',
    disciplina: 'Matemática - Estatística',
    data: '24/05/2023',
    horario: '16:00',
    duracao: '1h30min',
    status: 'Concluída',
  },
  {
    aluno: 'Aluno 14',
    disciplina: 'Física - Termodinâmica',
    data: '25/05/2023',
    horario: '18:00',
    duracao: '2h',
    status: 'Concluída',
  },
  {
    aluno: 'Aluno 15',
    disciplina: 'Química - Inorgânica',
    data: '26/05/2023',
    horario: '20:00',
    duracao: '1h',
    status: 'Concluída',
  },
  {
    aluno: 'Aluno 16',
    disciplina: 'Biologia - Ecologia',
    data: '27/05/2023',
    horario: '09:00',
    duracao: '1h30min',
    status: 'Concluída',
  },
];

const ITEMS_PER_PAGE = 6;

const TabelaAulas = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
            {paginatedAulas.map((aula, index) => (
              <LinhaAula key={index + (currentPage - 1) * ITEMS_PER_PAGE} {...aula} semAcao />
            ))}
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
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded border text-sm disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
        <button
          className="px-3 py-1 rounded border text-sm disabled:opacity-50"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default TabelaAulas;
