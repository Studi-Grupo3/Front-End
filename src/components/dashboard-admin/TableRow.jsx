export function TableRow({ row, columns }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      {columns.map((col, i) => {
        const value = row[col.accessor];

        if (col.accessor === 'status') {
          let colorClass = '';

          if (value === 'Ativo') {
            colorClass = 'bg-green-100 text-green-800';
          } else if (value === 'Inativo') {
            colorClass = 'bg-red-100 text-red-800';
          } else {
            colorClass = 'bg-gray-100 text-gray-800';
          }

          return (
            <td key={i} className="px-6 py-4 whitespace-nowrap">
              <span className={`${colorClass} px-2 py-1 rounded-full text-xs font-semibold`}>
                {value}
              </span>
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
  