import { useState, useRef, useEffect } from 'react';
import { Filter, Check } from 'lucide-react';

export const FilterButton = ({ labels, selectedFilter, onSelectFilter }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef   = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    if (selectedFilter !== 'ALL') {
      onSelectFilter('ALL');
      setOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 cursor-pointer bg-white border border-gray-300 px-3 py-2 rounded-md shadow-sm hover:bg-gray-100 transition"
      >
        <Filter size={18} />
        <span className="font-medium hidden sm:inline">
          {labels[selectedFilter]}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''} hidden sm:block`}
          viewBox="0 0 20 20" fill="currentColor"
        >
          <path fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94
                   l3.71-3.71a.75.75 0 111.08 1.04l-4.25
                   4.25a.75.75 0 01-1.08 0L5.21
                   8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-2 w-56 left-1/2 -translate-x-1/2 bg-white
                     border border-gray-200 rounded-2xl shadow-lg overflow-hidden text-sm"
        >
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <span className="font-semibold text-gray-900 text-sm">Filtrar por</span>
            <button
              onClick={handleClear}
              className={
                selectedFilter !== 'ALL'
                  ? 'text-blue-600 hover:underline cursor-pointer text-sm'
                  : 'text-gray-400 cursor-not-allowed text-sm'
              }
            >
              Limpar
            </button>
          </div>

          <div className="flex flex-col text-gray-900">
            {Object.entries(labels)
              .filter(([key]) => key !== 'ALL')
              .map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { onSelectFilter(key); setOpen(false); }}
                  className="flex items-center justify-between px-4 py-3 text-left hover:bg-gray-100 cursor-pointer"
                >
                  <span>{label}</span>
                  {selectedFilter === key && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                </button>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};
