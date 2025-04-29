import React from 'react';
import { Save } from 'lucide-react';

export function SaveButton({ onClick, label = "Salvar", className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#3970B7] text-white px-6 py-2 rounded hover:bg-[#2f5ca0] transition text-sm cursor-pointer flex items-center gap-2 ${className}`}
    >
      <Save size={16} />
      {label}
    </button>
  );
}
