import React from 'react';

const getStatusBadge = (status) => {
  if (status === 'Em breve') {
    return (
      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
        {status}
      </span>
    );
  }

  return (
    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
      {status}
    </span>
  );
};

const LinhaAula = ({ aluno, disciplina, data, horario, duracao, status, semAcao }) => (
  <tr className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
    <td className="px-4 py-3 border border-gray-200">{aluno}</td>
    <td className="px-4 py-3 border border-gray-200">{disciplina}</td>
    <td className="px-4 py-3 border border-gray-200">{data}</td>
    <td className="px-4 py-3 border border-gray-200">{horario}</td>
    <td className="px-4 py-3 border border-gray-200">{duracao}</td>
    <td className="px-4 py-3 border border-gray-200">{getStatusBadge(status)}</td>
    {/* Remova a coluna de ação se semAcao for true */}
    {!semAcao && (
      <td className="px-4 py-3 border border-gray-200">
        {/* ...botão de ação... */}
      </td>
    )}
  </tr>
);

export default LinhaAula;
