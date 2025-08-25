import React from 'react';

export function Input({ label, type = 'text', value, onChange }) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}
