import React, { useState } from 'react';

const ITEMS_PER_PAGE = 5;

export function TableSection({ title, columns, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter(row =>
    columns.some(col =>
      String(row[col.accessor] || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const Button = ({ label, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-1.5 rounded-md border font-medium text-sm transition
        ${disabled
          ? 'cursor-not-allowed text-gray-400 border-gray-200 bg-gray-100'
          : 'text-blue-600 border-blue-300 hover:bg-blue-50'
        }
      `}
    >
      {label}
    </button>
  );

  // Renderizador de linha, que respeita 'accessor' ou 'render'
  function TableRow({ row, columns }) {
    return (
      <tr className="odd:bg-white even:bg-gray-50">
        {columns.map((col, i) => (
          <td
            key={i}
            className={`px-6 py-4 whitespace-nowrap ${
              col.accessor === 'status' ? 'capitalize' : ''
            } ${col.label === 'Pago' ? 'text-center' : ''}`}
          >
            {col.render
              ? col.render(row)
              : row[col.accessor]}
          </td>
        ))}
      </tr>
    );
  }

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm overflow-hidden">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <input
          type="text"
          placeholder="🔍 Buscar..."
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-64 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-600 border border-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-6 py-3 font-semibold whitespace-nowrap ${
                    col.label === 'Pago' ? 'text-center w-20' : ''
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <TableRow key={idx} row={row} columns={columns} />
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center space-x-2">
            <Button
              label="«"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Button
              label="‹"
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            />
            <span className="px-2 text-sm text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              label="›"
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
            <Button
              label="»"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
