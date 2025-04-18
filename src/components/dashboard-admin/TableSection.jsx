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

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <input
          type="text"
          placeholder="🔍 Buscar..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    col.accessor === 'actions' ? 'w-[80px] text-center' : ''
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

        {/* Pagination */}
        <div className="flex items-center justify-center mt-6 space-x-2 text-sm text-gray-700">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md hover:bg-blue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            «
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md hover:bg-blue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            ‹
          </button>
          <span className="px-2 select-none">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md hover:bg-blue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            ›
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md hover:bg-blue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            »
          </button>
        </div>
      </div>
    </section>
  );
}
