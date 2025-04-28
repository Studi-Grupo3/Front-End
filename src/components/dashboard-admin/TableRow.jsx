export function TableRow({ row, columns }) {
    return (
      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
        {columns.map((col, i) => {
          const value = row[col.accessor];
  
          if (col.accessor === 'status') {
            const statusClass =
              value === 'Pago'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700';
  
            return (
              <td key={i} className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}
                >
                  {value}
                </span>
              </td>
            );
          }
  
          if (col.accessor === 'actions') {
            return (
              <td
                key={i}
                className="px-6 py-4 text-center whitespace-nowrap w-[80px]"
              >
                •••
              </td>
            );
          }
  
          return (
            <td key={i} className="px-6 py-4 whitespace-nowrap">
              {value}
            </td>
          );
        })}
      </tr>
    );
  }
  