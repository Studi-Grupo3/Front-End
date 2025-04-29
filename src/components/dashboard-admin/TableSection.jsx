import { useState } from 'react';
import { TableRow } from './TableRow';

const ITEMS_PER_PAGE = 5;

export function TableSection({ title, columns, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter((row) =>
    row.name?.toLowerCase().includes(searchQuery.toLowerCase())
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
      className={`px-3 py-1.5 rounded-md border font-medium transition text-sm
        ${disabled
          ? 'cursor-not-allowed text-gray-400 border-gray-200 bg-gray-100'
          : 'text-blue-600 border-blue-300 hover:bg-blue-50'
        }`}
    >
      {label}
    </button>
  );

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm overflow-hidden">
      <div className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-gray-800 whitespace-nowrap leading-tight">
            {title}
          </h2>
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="🔍 Buscar..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-600 border border-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-6 py-3 font-semibold whitespace-nowrap ${col.accessor === 'actions' ? 'w-[80px] text-center' : ''
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

        {/* Paginação centralizada */}
        <div className="mt-6 w-full flex justify-center">
          <div className="relative w-full sm:w-[25%] flex items-center justify-between">
            <div className="flex space-x-2">
              <Button
                label="«"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              />
              <Button
                label="‹"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              />
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-700">
              Página {currentPage} de {totalPages}
            </div>

            <div className="flex space-x-2">
              <Button
                label="›"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
      </div>
    </section>
  );
}
